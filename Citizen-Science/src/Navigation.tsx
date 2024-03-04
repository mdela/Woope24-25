import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from './util/AuthContext';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from "./screens/SplashScreen";
import NavigationBar from "./components/NavigationBar";
import HomeScreen from "./screens/HomeScreen";
import { MapScreen } from '../screens/Map/Map.Screen';
import { MapHome } from '../screens/MapHome/MapHome.Screen';
import { SMapScreen } from '../screens/Map/SMap.Screen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
	const { userToken } = useContext(AuthContext);
	const [isInitialLoading, setIsInitialLoading] = useState(true);

	// Simulate a splash screen delay or initial loading process
	useEffect(() => {
		setTimeout(() => {
			setIsInitialLoading(false);
		}, 1000); // Adjust time as needed
	}, []);

	if (isInitialLoading) {
		// Show splash screen while loading
		return <SplashScreen />;
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{userToken ? (
				<>
					<Stack.Screen name="NavigationBar" component={NavigationBar} />
				</>
			) : (
				// No token found, user is not signed in
				<>
					<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ animation: 'fade' }} />
					<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'fade' }} />
					<Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'slide_from_bottom' }} />
					<Stack.Screen name="Signup" component={SignupScreen} options={{ animation: 'slide_from_bottom' }} />
					<Stack.Screen name="MapScreen" component={MapScreen} options={{ animation: 'fade' }} />
					<Stack.Screen name="MapHome" component={MapHome} options={{ animation: 'slide_from_bottom' }} />
					<Stack.Screen name="SMapScreen" component={SMapScreen} options={{ animation: 'slide_from_bottom' }} />
				</>
			)}
		</Stack.Navigator>
	);
};

export default AppNavigation;
