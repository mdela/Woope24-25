import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Dimensions, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import { Button, Title, IconButton } from 'react-native-paper';
import * as Location from 'expo-location';
import { mapStyle } from './Map.Style';
import * as ImagePicker from 'expo-image-picker';
import PinPicScreen from '../PinPicScreen';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const customMarkerImage = require('../../../assets/College_marker.png')
const backArrowImage = require('../../../assets/step-backward.png')

var MarkerIndex = 0;

export const markersData = [
  { title: "CSUN Library", description: "", coordinate: { latitude: 34.239958, longitude: -118.529187 } }, //array containing hard pins
  { title: "SBC College", description: "", coordinate: { latitude: 46.085323, longitude: -100.674631 } },  //should be switched to db implementation
];

interface PinPicScreenProps {                                                                              //navigator to pin picture screen
  navigation: any;
}
export const UserMarkersData = [];                                                                         //array for soft pins. Should be switched to db

export const MapScreen = (props: PinPicScreenProps) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerTitle, setMarkerTitle] = useState("");
  const [markerDescription, setMarkerDescription] = useState("");
  const [markerImage, setMarkerImage] = useState("");



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

  const handleMapPress = (event) => {                                                                     //handles pin placement on press
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    setModalVisible(true);
  };

  const addCustomMarker = () => {                                                                         //works in tandem with above. Also saves soft pins to local array
    UserMarkersData.push({
      title: markerTitle,
      description: markerDescription,
      coordinate: markerCoordinate,
      index: MarkerIndex,
    });
    MarkerIndex++;
    setModalVisible(false);
    setMarkerTitle("");
    setMarkerDescription("");
    setMarkerImage("");
  };

  const addPictureFromGallery = () => props.navigation.navigate("PinPicScreen");                          //navigates to picture screen
  const returnToMapHome = () => props.navigation.navigate("MapHome"); 
  const advancedOptions = () => props.navigation.navigate("AddPin");                                     //navigates back to MapHome screen


  return (
    <SafeAreaView style={mapStyle.flex}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={mapStyle.modalContainer}>
          <View style={mapStyle.modalContent}>
            <TextInput
              style={mapStyle.input}
              onChangeText={text => setMarkerTitle(text)}
              value={markerTitle}
              placeholder="Enter Title"
            />
            <TextInput
              style={mapStyle.input}
              onChangeText={text => setMarkerDescription(text)}
              value={markerDescription}
              placeholder="Enter Description"
            />
            <TouchableOpacity onPress={addCustomMarker}>
              <Text>Add Marker</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={advancedOptions}>
              <Text>Advanced Options</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {initialRegion && (
        <MapView style={mapStyle.map} initialRegion={initialRegion} onPress={handleMapPress}>
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
            >
              <Callout tooltip onPress = {addPictureFromGallery}>
                <View style={mapStyle.bubble}>
                  <Text>{marker.title}</Text>
                  <Text>{marker.description}</Text>
                  <Text style = {{opacity: 0.25}}>Click bubble to add/view picture</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
          <View>            
            <Button onPress = {returnToMapHome} style = {mapStyle.buttonCallout} icon = {backArrowImage}/>
          </View>
    </SafeAreaView>
  );
}
