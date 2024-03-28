import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import {fetchWithToken} from '../util/fetchWithToken';
import {useIsFocused} from "@react-navigation/native";
import {AuthContext} from "../util/AuthContext";
import {Agenda} from 'react-native-calendars'; // Calendar ~EV
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { Card, Avatar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Item {
    name: string;
    height: number;
    day: Date;
    startTime: string;
    endTime: string;
    location: string;
	description: string;
	formattedStartTime: string; 
	formattedEndTime: string;
}
type Event = {
    name: string;
    date: string;
    height: number;
    startTime: string;
	endTime: string;
    location: string;
	description: string;
	formattedStartTime: string; 
	formattedEndTime: string;
};



const CalendarScreen: React.FC = () => {

	const [items, setItems] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState('');
	const now = new Date();
	const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [selectedDate, setSelectedDate] = useState(localMidnight);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [eventStartTime, setEventStartTime] = useState(new Date());
	const [startTime, setStartTime] = useState('');
	const [eventEndTime, setEventEndTime] = useState(new Date());
	const [endTime, setEndTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');
	const [formattedStartTime, setFormattedStartTime] = useState('');
	const [formattedEndTime, setFormattedEndTime] = useState('');
    // TODO Uncomment when implementing backend
	// testing fetchWithToken
	// useEffect(() => {
	// 	if (isFocused) {
	// 		const fetchData = async () => {
	// 			const { response, newAccessToken, tokenRefreshFailed } = await fetchWithToken(`${process.env.EXPO_PUBLIC_API_URL}/health/protected-route`);
	// 			if (newAccessToken && newAccessToken !== userToken) {
	// 				setUserToken(newAccessToken);
	// 			} else if (tokenRefreshFailed) {
	// 				setUserToken(null);
	// 			}
	// 		};
	// 		fetchData();
	// 	}
	// }, [isFocused]);

	// Calendar ~EV


	
	const loadItems = async (day: any) => {
		if (!day) {
			return;
		}
		try {
			const storedEvents = await AsyncStorage.getItem('events');
			let parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : {};
			// Merge hard-coded events with stored events
			parsedStoredEvents = { ...parsedStoredEvents };
			setItems(parsedStoredEvents);
		} catch (error) {
			console.error('Error loading events:', error);
		}
	};

	const userCreateEvent = async () => {
		// Include startTime and location in the event object
		const event: Event = {
			name: eventName,
			date: eventDate,
			height: 500, // You might want to reconsider the use of 'height' for dynamic content
			startTime: startTime,
			endTime: endTime,
			location: location,
			description: description
		};

		if (eventName === '' || eventDate === '' || startTime === '' || endTime === '' || location === '' || description === '') {
			alert('Please enter all details for the event.');
			return;
		}

		try {
			const storedEvents = await AsyncStorage.getItem('events');
			let parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : {};

			// No need to merge hard-coded events here if they are only temporary
			// But if they should be included, ensure they have the same structure

			const updatedEventsForDate = parsedStoredEvents[event.date]
				? [...parsedStoredEvents[event.date], event]
				: [event];

			const updatedEvents = {
				...parsedStoredEvents,
				[event.date]: updatedEventsForDate,
			};

			await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));

			// Reset form
			setEventName('');
			setEventDate('');
			setStartTime('');
			setEndTime('');
			setLocation('');
			setDescription('');
			setModalVisible(false);

			loadItems({ dateString: event.date }); // Make sure to refresh the events
		} catch (error) {
			console.log(error, 'error in event creation');
			alert('Error creating event');
		}
	};


	const deleteEvent = async (day: string, event: Event) => {		// Handle for the User Deleted Cal Events ~EV
		try {
			const storedEvents = await AsyncStorage.getItem('events');
			const parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : {};
			const updatedEvents = {
				...parsedStoredEvents,
				[day]: parsedStoredEvents[day].filter((e: Event) => e !== event),
			};
			await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
			loadItems(day);
		} catch (error) {
			console.log(error, 'error in event deletion');
			alert('Error deleting event');
		}
	};


	const handleDateChange = (event: Event, selectedDate: Date) => {
		if (selectedDate !== undefined) {
			const year = selectedDate.getFullYear();
			const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2); // Months are 0 indexed so +1 and slice for leading 0
			const day = ("0" + selectedDate.getDate()).slice(-2);
			setEventDate(`${year}-${month}-${day}`);
			setSelectedDate(selectedDate);
		}
	};

	const handleStartTimeChange = (event: Event, eventStartTime: Date) => {
		const year = eventStartTime.getFullYear();
		const month = ("0" + (eventStartTime.getMonth() + 1)).slice(-2); // getMonth() is zero-indexed
		const day = ("0" + eventStartTime.getDate()).slice(-2);
		const hours = ("0" + eventStartTime.getHours()).slice(-2);
		const minutes = ("0" + eventStartTime.getMinutes()).slice(-2);
		const seconds = ("0" + eventStartTime.getSeconds()).slice(-2);
	
		setFormattedStartTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
		setStartTime(`${hours}:${minutes}:${seconds}`);
		
	}

	const handleEndTimeChange = (event: Event, eventEndTime: Date) => {
		setEndTime(eventEndTime.toLocaleTimeString('en-US'));
		
	}


	const handleDeleteAllEvents = async () => {
		try {
			await AsyncStorage.removeItem('events');
			console.log('All events deleted successfully');
			// Optionally set state or trigger a UI update
		} catch (error) {
			console.error('Error deleting all events:', error);
		}
	};

	//show modal for viewing event details
	const [showModal, setShowModal] = useState(false);

	// Render Items
    const renderItem = (item: Item) => {
        return (
			<TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
            <Card onPress={() => {
				setSelectedItem(item);
				setShowModal(true)
			}}>
			if(selectedItem !== null){
				<Modal
				animationType="slide"
				transparent={true}
				visible={showModal}
				onRequestClose={() => {
			  	setShowModal(false);
				}}
		  	>
			{/* Modal content */}
				<View style={styles.centeredView}>
					<View 
						style={[styles.modalView, {
							padding: 10,
							height: 400,
							width: 400,
							alignItems: 'flex-start',
						}]}
						
					>
						<Text
				  			style={{		
								fontSize: 28,
								padding: 0,
								paddingVertical: 1,
				  			}}
						>
							{selectedItem.name} {'\n'}	
						</Text>

						<Text 
					style={{
						alignItems: 'flex-start',
					}}
				>
					Location: {selectedItem.location} {'\n'}
						</Text>

						<Text
					style={{
						alignItems: 'flex-start',
					}}
				>
					Description: {selectedItem.description} {'\n'}
						</Text>

						<Text
				
				>
					Time: {selectedItem.startTime} - {selectedItem.endTime}
					
						</Text>
					  
						<TouchableOpacity
							style={styles.cancelButton} onPress={() => setShowModal(false)}>
							<Text style={styles.cancelButtonText}>Close</Text>
					  	</TouchableOpacity>
					</View>
			  	</View>
		  		</Modal>
	}

        		<Card.Content>
                	<View
                     style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                }}>
					<Text style={{fontWeight: 'bold'}}>
                        {item.name} {'\n'}
						<Text style={{fontSize: 12, fontWeight: 'normal'}}>
                            {item.startTime} {'\n'}
                        </Text>
						<Text style={{fontSize: 12, fontWeight: 'normal'}}>
                            {item.endTime} {'\n'}
                        </Text>
                        <Text style={{fontSize: 12, fontWeight: 'normal', fontStyle: 'italic'}}>
                            {item.location}
                        </Text>
                    </Text>
                    	<Avatar.Text label="C"/>
                	</View>
            	</Card.Content>
            </Card>
            </TouchableOpacity>
		);
    };

	return (
		<SafeAreaView style={[styles.container, {backgroundColor: modalVisible ? 'white' : 'white'}]}>
		  <Agenda
			items={items}
			loadItemsForMonth={loadItems}
			renderItem={renderItem}
			theme={{
				agendaDayTextColor: '#5EA1E9',
				agendaDayNumColor: '#5EA1E9',
				agendaTodayColor: '#5EA1E9',
				agendaKnobColor: '#5EA1E9'
			}}

			renderEmptyData={() => {
				return (
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text>No Items For This Day</Text>
					</View>
				);
			}}

		  />

		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
			  setModalVisible(false);
			}}
		  >
			{/* Modal content */}
			<View style={styles.centeredView}>
			  <View style={styles.modalView}>
				<TextInput
				  style={styles.input}
				  placeholder="Event Name"
				  value={eventName}
				  onChangeText={setEventName}
				  placeholderTextColor={'darkgray'}
				/>


				<TextInput
				  style={styles.input}
				  placeholder="Set Location"
				  value={location}
				  onChangeText={setLocation}
				  placeholderTextColor="darkgray"
				/>

				<TextInput
				  style={styles.input}
				  placeholder="Description"
				  value={description}
				  onChangeText={setDescription}
				  placeholderTextColor="darkgray"
				/>
				
				<DateTimePicker
					testID="dateTimePicker"
					value={selectedDate}
					mode="date"
					is24Hour={true}
					display="default"
					onChange={handleDateChange}
				/>

				<Text>
					Start Time:
				</Text>

				<DateTimePicker
					testID="dateTimePicker"
					value={eventStartTime}
					mode="time"
					is24Hour={true}
					display="default"
					onChange={handleStartTimeChange}
				/>

				<Text>
					End Time:
				</Text>

				<DateTimePicker
					testID="dateTimePicker"
					value={eventEndTime}
					mode="time"
					is24Hour={true}
					display="default"
					onChange={handleEndTimeChange}
					format='y-MM-dd h:mm:ss a'
				/>

				<Button title="Create Event" onPress={userCreateEvent} />
					<TouchableOpacity
					  style={styles.cancelButton} onPress={() => setModalVisible(false)}>
					  <Text style={styles.cancelButtonText}>Cancel</Text>
					</TouchableOpacity>
			  </View>
			</View>
		</Modal>
		{!modalVisible && (
			<TouchableOpacity
				style={styles.createButton}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.createButtonText}>Create Event</Text>
			</TouchableOpacity>
		)}
		</SafeAreaView>
	  );
	};

	const styles = StyleSheet.create({
		container: {
		  flex: 1,
		  backgroundColor: 'white',
		},
		centeredView: {
		  flex: 1,
		  justifyContent: 'center',
		  alignItems: 'center',
		  marginTop: 22,
		},
		modalView: {
		  margin: 20,
		  backgroundColor: 'white',
		  borderRadius: 20,
		  padding: 35,
		  alignItems: 'center',
		  shadowColor: '#000',
		  shadowOffset: {
			width: 0,
			height: 2,
		  },
		  shadowOpacity: 0.25,
		  shadowRadius: 4,
		  elevation: 5,
		},
		input: {
		  width: 300,
		  height: 40,
		  marginBottom: 12,
		  borderWidth: 1,
		  padding: 10,
		},
		createButton: {
		  backgroundColor: '#1E90FF',
		  padding: 10,
		  borderRadius: 20,
		  position: 'absolute',
		  bottom: 20,
		  alignSelf: 'center',
		},
		createButtonText: {
		  color: 'white',
		  fontSize: 16,
		  textAlign: 'center',
		},
	  cancelButton: {
		backgroundColor: '#1E90FF',
		marginTop: 30,
		marginBottom: -30,
		paddingHorizontal: 25,
		paddingVertical: 4,
		borderRadius: 5,
	  },
	  cancelButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		textAlign: 'center',
	  },
	  datePickerText: {
        marginBottom: 10,
        color: '#1E90FF',
        fontSize: 18,
      },
	});

export default CalendarScreen;
