import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {Appbar} from 'react-native-paper';
import {Card, Button, TextInput} from 'react-native-paper';
import * as Location from 'expo-location';
import React2, {useState, useEffect} from 'react';
import {HomePage} from './MapHome.Style'
import MapView, { Callout, Marker } from "react-native-maps";

interface MapPageScreenProps {                                                                      //allows navigation through screens
    navigation: any;
}

export const MapHome = (props: MapPageScreenProps) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    useEffect(() => {                                                                                        //gets user's initial map location
        const getLocation = async () => {        
          let location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location.coords);
    
          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        };
    
        getLocation();
      }, []);

    const [location, setLocation] =useState({})                                                     //gets permissions from user's device
    const getLocation = () => {
        (async() => {
          let {status} = await Location.requestForegroundPermissionsAsync()
          if (status == 'granted'){
            console.log('Permission successful!')
          } else {
            console.log('Permission denied')
          }
          const loc = await Location.getCurrentPositionAsync()
          console.log(loc)
          setLocation(loc)
        })()
    };
    const ViewMap = () => props.navigation.navigate("MapScreen");                                    //handles navigation
    const ViewSMap = () => props.navigation.navigate("SMapScreen");

    return(
        <SafeAreaView style = {HomePage.content}>
            <Appbar>
                <Appbar.Content title = "Map"/>
            </Appbar>
            <Card style = {HomePage.card}> 
                <Card.Content>
                    <MapView style={HomePage.smallmap} initialRegion={initialRegion}>
                        {currentLocation && (
                            <Marker
                            coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            }}
                            title="Your Location"
                            />
                        )}
                    </MapView>
                    <Button style = {HomePage.button}
                        buttonColor='#0810F6'
                        mode="contained"
                        onPress={() => {
                        getLocation();
                        ViewMap();
                        }}
                    >Place pin</Button>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
}
