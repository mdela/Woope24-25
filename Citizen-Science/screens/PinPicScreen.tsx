import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//Plan for future picture to pin connection since MapView does not yet fully support pictures.
//Get pictures to save on this screen and have each pin have a unique instance of this screen.
//After picture is selected for pin, display each pins picture here if once has been selected.
//Otherwise, display button that asks user to add a picture. Try saving through images array.
//If not, per Professor Modaressi, try saving directly to User_Pictures and getting path through project.
//I have been working on this solo for 3 weeks.
//Good luck

export const images = [];

export default function PinPicScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {                                                           //calls device gallery for images
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
        images.push(image);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});
