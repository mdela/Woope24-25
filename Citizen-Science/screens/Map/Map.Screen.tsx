import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Dimensions, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import { Button, Title } from 'react-native-paper';
import * as Location from 'expo-location';
import { mapStyle } from './Map.Style';
import * as ImagePicker from 'expo-image-picker';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const customMarkerImage = require('../../assets/College_marker.png');
var galleryImage = null;

const markersData = [
  { title: "CSUN Library", description: "", coordinate: { latitude: 34.239958, longitude: -118.529187 } },
  { title: "SBC College", description: "", coordinate: { latitude: 46.085323, longitude: -100.674631 } },
];

export const UserMarkersData = [];

export const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerTitle, setMarkerTitle] = useState("");
  const [markerDescription, setMarkerDescription] = useState("");
  const [markerImage, setMarkerImage] = useState("");



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

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    setModalVisible(true);
  };

  const addCustomMarker = () => {
    UserMarkersData.push({
      title: markerTitle,
      description: markerDescription,
      coordinate: markerCoordinate,
      image: galleryImage,
    });
    setModalVisible(false);
    setMarkerTitle("");
    setMarkerDescription("");
    setMarkerImage("");
  };

  const addPictureFromGallery = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    setMarkerImage(result.assets[0].uri);
  };

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
            <TouchableOpacity onPress={addPictureFromGallery}>
              <Text>Add Picture?</Text>
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
              <Callout tooltip>
                <View style={mapStyle.bubble}>
                  <Text>{marker.title}</Text>
                  <Text>{marker.description}</Text>
                </View>
                {markerImage && <Image source={{uri: markerImage}} style={{ width: 50, height: 50 }} />}

              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
}
