import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {Appbar} from 'react-native-paper';
import {Card, Button, TextInput} from 'react-native-paper';
import * as Location from 'expo-location';
import React2, {useState, useEffect} from 'react';
import {HomePage} from './MapHome.Style'

interface MapPageScreenProps {                                                                      //allows navigation through screens
    navigation: any;
}

export const MapHome = (props: MapPageScreenProps) => {
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
    const AddPin = () => props.navigation.navigate("AddPin");

    return(
        <SafeAreaView style = {HomePage.content}>
            <ScrollView style = {HomePage.view}>
                <Appbar>
                    <Appbar.BackAction />
                    <Appbar.Content title = "Map"/>
                </Appbar>
                <Card>
                <Card.Content> 
                    <Button 
                    mode="contained"
                    onPress={() => {
                        getLocation();
                        ViewMap();
                       }}
                    >Place pin</Button>
                    <Button 
                    mode="contained"
                    onPress={() => {
                        ViewSMap();
                       }}
                    >View Map</Button>
                    <Button 
                    mode="contained"
                    onPress={() => {
                        Location.requestForegroundPermissionsAsync();
                        AddPin();
                       }}
                    >Add Pin</Button>
                </Card.Content>
            </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
