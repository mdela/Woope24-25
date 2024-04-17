import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet , SafeAreaView, Dimensions, Image} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import {FAB, Title} from 'react-native-paper';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { mapStyle } from './Map.Style';
import { UserMarkersData } from './Map.Screen';

//works the same as Map.Screen.tsx except that no pins can be placed and code is more archaic.
//is obsolete as of 4/17/24
//will leave for future testing

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const customMarkerImage = require('../../assets/College_marker.png');

const markersData = [
  { title: "CSUN Library", description: "", coordinate: { latitude: 34.239958, longitude: -118.529187 } },
  { title: "BCE College", description: "", coordinate: { latitude: 46.085323, longitude: -100.674631 } },
];


export const SMapScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);


        useEffect(() => {
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
         
        return (
            <View style={mapStyle.flex}>
              {initialRegion && (
                <MapView style={mapStyle.map} initialRegion={initialRegion}>
                  {currentLocation && (
                    <Marker
                      coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                      }}
                      title="Your Location"
                    />
                  )}
          {markersData.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            >
            <Image source={customMarkerImage} style={{ width: 30, height: 30 }} />
            </Marker>
          ))}
                  {UserMarkersData.map((marker, index) => (
                  <Marker
                     pinColor='plum'
                     key={index}
                     coordinate={marker.coordinate}
                     title={marker.title}
                     description={marker.description}>
                  </Marker>
                    ))}
                </MapView>
              )}
              </View>
              );
}