import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, Dimensions} from "react-native";
import styles from '../StyleSheet';
import CustomButton from '../components/CustomButton';
import CustomTextField from '../components/CustomTextField';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LogoName from "../components/LogoName";
import BackButton from "../components/BackButton";
import ScreenTitle from "../components/ScreenTitle";
import homeScreen from "./HomeScreen";
import loginScreen from "./LoginScreen";

type NavigationParam = {
    Login: undefined;
    Signup: undefined;
    NavigationBar: undefined;
};

//Type for our Navigation in our component
type NavigationProp = NativeStackNavigationProp<NavigationParam, 'Signup'>;

const SignupScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { height, width } = Dimensions.get('window')

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <ImageBackground
            source={require('../../assets/background2.png')}
            style={{ flex: 1, width: '100%', height: '100%' }}>

            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 <BackButton />
                 <LogoName position={'bottomRight'} color={'grey'}/>

                 <ScreenTitle
                     text={'Create an Account!'}
                     textStyle={'title'}
                     // TODO font size with be determined with PixelRatio lib
                     fontSize={width * 0.1}
                     color={'white'}
                     position={{horizontal: width * 0.08, vertical: height * 0.30}}
                 />

                {/* Email TextField */}
                <CustomTextField
                    placeholder="Name"
                    value={email}
                    onChangeText={setName}
                    borderColor="#1e90ff"
                    borderRadius={10}
                    position={{ horizontal: 'center', vertical: height * 0.60 }}
                />


                <CustomTextField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    borderColor="#1e90ff"
                    borderRadius={10}
                    position={{ horizontal: 'center', vertical: height * 0.69 }}
                />


                {/* Password TextField */}
                <CustomTextField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} // To hide password input
                    borderColor="#1e90ff"
                    borderRadius={10}
                    position={{ horizontal: 'center', vertical: height * 0.78 }}
                />

                <CustomButton
                    label="Sign Up"
                    labelColor="white"
                    backgroundColor="#1e90ff"
                    onPress={() => navigation.navigate('Login')}
                    position={{ horizontal: 'center', vertical: height * 0.85 }}
                />


             </SafeAreaView>

        </ImageBackground>


    )
};
export default SignupScreen;