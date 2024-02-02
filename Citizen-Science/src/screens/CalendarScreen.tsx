import { useNavigation } from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import {Calendar, Agenda} from 'react-native-calendars';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, Avatar, Appbar} from 'react-native-paper';



const CustomDayComponent = ({ date, state, onPress }) => {


  return (
    <TouchableOpacity
  onPress={() => onPress(date)} // Assuming you pass an onPress prop to CustomDayComponent
  style={{
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  }}>
  <Text style={{ fontSize: 18, color: state === 'disabled' ? 'gray' : 'black', }}>
    {date.day}
  </Text>
</TouchableOpacity>
  );
    };


const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  
const CalendarScreen: React.FC = () => {

 

    const navigator = useNavigation();
    

const HomePage = () => {
    navigator.navigate("Home");
};

const EventPage = () => {
  navigator.navigate("Event");
}

//Creates NavBar at the top to go back or add event
//Commenting out for now to use UI elements.
// const MyComponent = () => (
//     <Appbar.Header style={{ backgroundColor: '#5EA1E9' }}>
//       <Appbar.BackAction color="white" onPress={HomePage} />
//       <Appbar.Content title= ""/>
//       <Appbar.Action color="white" icon="plus" onPress={EventPage} />
//     </Appbar.Header>
//   );
  
    const [items, setItems] = useState({});
  
    const loadItems = (day) => {
      setTimeout(() => {
        const newItems = {...items}; // Create a shallow copy of items for immutability
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!newItems[strTime]) {
            newItems[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
              newItems[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
            }
          }
        }
        setItems(newItems);
      }, 1000);
    };
  
    //Rendering events for dates
    const renderItem = (item) => {
      return (
        <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
          <Card>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>Event</Text>
                <Avatar.Text label="M" />
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      );
    };
  
    const [selectedDay, setSelectedDay] = useState('');

    const [showAgenda, setShowAgenda] = useState(false);

    const handleDayPress = (day) => {
      console.log("Selected day: ", day.dateString);
      setSelectedDay(day.dateString);
      setShowAgenda(true);
    };

    return (
      <View  style={styles.container}>
        {/* <MyComponent /> */}
        {!showAgenda && (
        <Calendar
          style={styles.cal}
          onDayPress={handleDayPress}
          dayComponent={({date, state}) => (
         <CustomDayComponent
            date={date}
             state={state}
             onPress={handleDayPress} // Pass handleDayPress or a similar handler here
          />
        
          )}
        />
        )}

      {showAgenda && (
        <Agenda
        
          selected={selectedDay}
          items={items}
          loadItemsForMonth={loadItems}
          renderItem={renderItem}
        />
        
        )}
  
      </View>
    );
    
  };
  
  export default CalendarScreen;

const styles = StyleSheet.create({
 
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 20,
        
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    cal: {
      borderWidth: 1,
      borderColor: 'gray',
      width: '100%',   // Adjust width as a percentage of the parent container
      height: '90%',
      alignSelf: 'center'
      
    }
});