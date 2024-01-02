import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, NavigationContainerRef } from '@react-navigation/native';

function SplashScreen() {
    const navigation = useNavigation<NavigationContainerRef<any>>();

    useEffect(() => {
        // Splash screen for 5 seconds
        const splashTimer = setTimeout(() => {
            navigation.navigate('Home'); // This will take us to HomePage
        }, 5000);

        return () => clearTimeout(splashTimer); // This will cancel our splash screen after 5 seconds
    }, []);

    return (
        <View>
            <Text>Splash Screen</Text>
        </View>
    );
}

export default SplashScreen;
