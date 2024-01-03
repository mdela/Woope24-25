import React from 'react';
import {Button, SafeAreaView, Text, View, StyleSheet, Dimensions} from "react-native";
import styles from "../StyleSheet";
import LogoName from "../components/LogoName";
import CustomButton from "../components/CustomButton";
import Blobs from "../components/Blobs";
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window')
    const titlePosition = height * -.20; // To place 'Welcome' text 75%  from the bottom of the screen
    const subtitlePosition = height * -.18; // // To place 'Welcome' in lakota text 75%  from the bottom of the screen

    // @ts-ignore
    return(
        <View style={styles.backgroundColor}>

            {/* First blob cluster */}
            <Blobs width={100} height={100} position={{horizontal: width-100, vertical: '5%'}}/>
            <Blobs width={50} height={50} position={{horizontal: width-80, vertical: '18%'}}/>
            <Blobs width={35} height={35} position={{horizontal: width-150, vertical: '1%'}}/>

            {/* Second blob cluster */}
            <Blobs width={90} height={90} position={{horizontal: width-100, vertical: '45%'}}/>
            <Blobs width={25} height={25} position={{horizontal: width-50, vertical: '42%'}}/>

            {/* Third blob cluster */}
            <Blobs width={110} height={110} position={{horizontal: '75%', vertical: '86%'}}/>
            <Blobs width={40} height={40} position={{horizontal: '88%', vertical: '83%'}}/>
            <Blobs width={45} height={45} position={{horizontal: '60%', vertical: '94%'}}/>


            <LogoName
                position={'topLeft'}
                color={'white'}
            />

            <SafeAreaView style={welcomeScreenStyles.safeArea}>
                <Text style={[welcomeScreenStyles.title, {top: titlePosition}]}>
                    Welcome
                </Text>
                <Text style={[welcomeScreenStyles.subtitle, {top: subtitlePosition}]}>
                    (taŋyáŋ yah)
                </Text>
            </SafeAreaView>


            <CustomButton
                size={{width: 300, height: 70}}
                label={'Login'}
                labelColor={'#3a9bdc'}
                backgroundColor={'white'}
                onPress={() => navigation.navigate('Login')}
                //TODO allow horizontal attr to take 'center' prop
                position={{horizontal: 'center', vertical: height * 0.60}}
            />

            <CustomButton
                size={{width: 300, height: 70}}
                label={'Signup'}
                labelColor={'white'}
                backgroundColor={'#3a9bdc'}
                onPress={() => navigation.navigate('Signup')}
                //TODO allow horizontal attr to take 'center' prop
                position={{horizontal: 'center', vertical: height * 0.70}}
                borderRadius={10}
                borderColor={'white'}
                borderWidth={3}
            />

        </View>
    )
};
export default WelcomeScreen;

const welcomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
      position: 'absolute',
      width: '100%'
    },
    title: {
        // Overriding font size from StyleSheet.tsx
        fontSize: 50,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        // Overriding font size and weight from StyleSheet.tsx
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff'

    },
});