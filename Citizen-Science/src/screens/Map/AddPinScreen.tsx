import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput, StatusBar, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker';
//import MapCamera from './MapCameraScreen';

interface AddPinScreenProps {                                  //allows navigation through screens 
	navigation: any;
}

export const AddPinScreen = () => {                                           
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [pinType, setPinType] = useState('hazard');           // Sets the default pin type to hazard
  const [image, setImage] = useState(null);

  //First checks for camera and GPS permissions and requests them as needed
  useEffect(() => {
    requestCameraPermission(); 
    requestLocationPermission();
  }, []);

  //Request for camera permission
  const requestCameraPermission = async () => {
    try {
      
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access camera roll was denied');
        return false;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }; 

  //Request for location permission
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //Request location permission and limits latitude to 6sf
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLongitude(location.coords.longitude.toFixed(6));
        setLatitude(location.coords.latitude.toFixed(6));
      } else {
        console.log('Permission to access location was denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //Get's gallery permission, displays the choosen image and reads for EXIF data; EXIF data not reading at all; unsure of what's wrong
const pickImage = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== 'granted') {
    const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
    exif: true, // Enable EXIF data retrieval
  });

  if (!result.canceled) {

    const imageUri = result.assets[0].uri;; // Access the image URI directly
    console.log("Self Image URI ", imageUri);

    // Check if EXIF data is available in the result
    // if (result.exif) {
    //   console.log("EXIF Data:", result.exif);
    // } else {
    //   console.log("No EXIF data available.");
    // }

    const assetInfo = await MediaLibrary.getAssetInfoAsync(imageUri);
     if (assetInfo) {
       console.log("Media Library EXIF Data:", assetInfo.exif);
     } else {
       console.log("Failed to retrieve asset information.");
    }
  
      setImage(imageUri);
    
    }
  };

  //Screen layout (Image,Buttons and Piker)
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Create A New Pin</Text>
      <TextInput
        style={styles.input}
        placeholder="Location Name"
        onChangeText={text => setLocationName(text)}
        value={locationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Local Name"
        onChangeText={text => setLocationName(text)}
        value={locationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location Details"
        onChangeText={text => setLocationDetails(text)}
        value={locationDetails}
      />
      <Picker
        style={[styles.input, styles.picker]}
        selectedValue={pinType}
        onValueChange={(itemValue, itemIndex) => setPinType(itemValue)}
      >
        <Picker.Item label="Hazard" value="hazard" />
        <Picker.Item label="Event" value="event" />
        <Picker.Item label="Tourist" value="tourist" />
        <Picker.Item label="Educational" value="educational" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        onChangeText={text => setLongitude(text)}
        value={longitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        onChangeText={text => setLatitude(text)}
        value={latitude}
      />
      <Button
        title="Get Location"
        onPress={getLocation}
        style={styles.button}
      />
      {/* <Button
        title="Take Picture"
        onPress={MapCamera}
        style={styles.button}
      />       */}
      <Button 
        title="Pick an image from camera roll" 
        style={styles.button}
        onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    resizeMode: 'contain',
    height:'100%',
    maxHeight: 400,
    width: '100%',
    maxWidth:300,
        
  },
});