import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { fetchWithToken } from '../util/fetchWithToken';
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../util/AuthContext";
import { Agenda } from 'react-native-calendars'; // Calendar ~EV
import AsyncStorage from '@react-native-async-storage/async-storage';			// Todo, Delete async storage import as we no longer need it ~ EV
import { Card, Avatar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
//import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'; // Android only


interface Item {
	name: string;
	height: number;
	day: Date;
	time: string;
	location: string;
	description: string;
}
type Event = {
	name: string;
	date: string;
	height: number;
	time: string;
	location: string;
	description: string;
};

const CalendarScreen: React.FC = () => {
	// Todo, DONE Commented out hard coded ~EV

	const [items, setItems] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [eventName, setEventName] = useState('');
	const [selectedEventDate, setSelectedEventDate] = useState('');
	const [location, setLocation] = useState('');
	//Added Description ~EV
	const [description, setDescription] = useState('');

	const navigation = useNavigation();

	//Using DateTimePicker Library  ~EV
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState<'date' | 'time'>('date');
	const [show, setShow] = useState(false);
	const [time, setTime] = useState('');		// Changed from startTime to time ~EV


	const onChange = (event: any, selectedDate: Date) => {
		const currentDate = selectedDate || date; // Use current state if selectedDate is null
		setShow(false);
		setDate(currentDate);
		if (mode === 'date') {
			const offset = currentDate.getTimezoneOffset();
			const localDate = new Date(currentDate.getTime() - (offset * 60 * 1000));
			const formattedDate = localDate.toISOString().split('T')[0]; // Extract date portion
			setSelectedEventDate(formattedDate);
		} else {
			const selectedTime = currentDate.toLocaleTimeString();
			setTime(selectedTime);
		}
	};
	// DateTimePickerAndroid.open({                    //FOR ANDROID ONLY ~EV
	// 	value: date,
	// 	onChange,
	// 	mode: currentMode,
	// 	is24Hour: true,
	// });


	const showMode = (currentMode: 'date' | 'time') => {
		setShow(true);
		setMode(currentMode);
	}

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};


	// TODO Uncomment when implementing backend
	// testing fetchWithToken
	// useEffect(() => {
	// 	if (isFocused) {
	// 		const fetchData = async () => {
	// 			const { response, newAccessToken, tokenRefreshFailed } = await fetchWithToken(`${process.env.EXPO_PUBLIC_API_URL}/health/protected-route`);
	// 			if (newAccessToken && newAccessToken !== userToken) {
	// 				setUserToken(newAccessToken);
	// 			} else if (tokenRefreshFailed) {
	// 				setUserToken(null);
	// 			}
	// 		};
	// 		fetchData();
	// 	}
	// }, [isFocused]);

	// Calendar ~EV

	const userCreateEvent = async () => {
		// Include time and location in the event object
		const event: Event = {
			name: eventName,
			date: selectedEventDate,
			height: 500, 			// Resize for dynamic height on all devices currently set to 500 ~EV
			time: time,
			location: location,
			description: description
		};

		// Todo, Delete checking as backend handles this ~ EV
		//if empty fields, promp user to fill in all fields 
		if (eventName === '' || selectedEventDate === '' || time === '' || location === '') {
			alert('Please enter all details for the event.');
			return;
		}

		try {
			const storedEvents = await AsyncStorage.getItem('events');						// Todo, Delete local storage component ~ EV

			let parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : {};

			const updatedEventsForDate = parsedStoredEvents[event.date]
				? [...parsedStoredEvents[event.date], event]
				: [event];

			const updatedEvents = {
				...parsedStoredEvents,
				[event.date]: updatedEventsForDate,
			};

			await AsyncStorage.setItem('events', JSON.stringify(updatedEvents)); 			// Todo, Delete local storage component ~ EV

			// Reset form
			setEventName('');
			setSelectedEventDate('');
			setTime('');
			setLocation('');
			setModalVisible(false);
			setDescription('');

			loadItems({ dateString: event.date });
		} catch (error) {
			console.log(error, 'error in event creation');
			alert('Error creating event');
		}
	};


	const loadItems = async (day: any) => {
		if (!day) {
			return;
		}
		try {
			const storedEvents = await AsyncStorage.getItem('events');				// Todo, Delete local storage component ~ EV
			let parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : {};
			// REMOVED HARD CODED EVENTS ~EV
			parsedStoredEvents = { ...parsedStoredEvents };
			setItems(parsedStoredEvents);
		} catch (error) {
			console.error('Error loading events:', error);
		}
	};

	//Todo, Decide on event deletion to delete more then just renders

	//Render Items ~EV
	const renderItem = (item: Item) => {
		const handleModify = () => {												// MODIFY FUNCTION POPULATES HERE ~EV				
			setEventName(item.name);
			setLocation(item.location);
			setDescription(item.description);
			setSelectedEventDate(item.date);
			setTime(item.time);
			setModalVisible(true);
		};
		const handleDelete = async () => {
			try {
				const storedEvents = await AsyncStorage.getItem('events');						// Todo, Delete local storage component ~ EV
				let parsedStoredEvents = storedEvents ? JSON.parse(storedEvents) : {};
				const updatedEventsForDate = parsedStoredEvents[item.date].filter((event: Event) => event.name !== item.name);
				const updatedEvents = {
					...parsedStoredEvents,
					[item.date]: updatedEventsForDate,
				};
				await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));				// Todo, Delete local storage component ~ EV																
				loadItems({ dateString: item.date });
			} catch (error) {
				console.error('Error deleting event:', error);
			}
		};
		return (
			<TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
				<Card>
					<Card.Content>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<Text style={{ fontWeight: 'bold' }}>
								{eventName || item.name} {'\n'}
								<Text style={{ fontSize: 12, fontWeight: 'normal' }}>
									{time || item.time} {'\n'}
								</Text>
								<Text style={{ fontSize: 12, fontWeight: 'normal', fontStyle: 'italic', color: 'blue' }}>
									{location || item.location}
								</Text>
								{'\n'}
								<Text style={{ fontSize: 12, fontWeight: 'normal', fontStyle: 'italic' }}>
									{description || item.description}
								</Text>
							</Text>
							<Avatar.Text label="C" />
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
							<Button title="Modify" onPress={handleModify} />					{/* MODIFY BUTTON ~EV */}
							<Button title="Delete" onPress={handleDelete} />					{/* DELETE BUTTON ~EV */}
						</View>
					</Card.Content>
				</Card>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: modalVisible ? 'white' : 'white' }]}>
			<Agenda
				items={items}
				loadItemsForMonth={loadItems}
				renderItem={renderItem}
				theme={{
					agendaDayTextColor: '#5EA1E9',
					agendaDayNumColor: '#5EA1E9',
					agendaTodayColor: '#5EA1E9',
					agendaKnobColor: '#5EA1E9'
					//Added limits to the agenda ~EV
				}}

				renderEmptyData={() => {
					return (
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text>No Items For This Day</Text>
						</View>
					);
				}}

			/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				{/* Modal content */}
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<TextInput
							style={styles.input}
							placeholder="Event Name"
							value={eventName}
							onChangeText={setEventName}
							placeholderTextColor={'darkgray'}
						/>
						<TextInput
							style={styles.input}
							placeholder="Set Location"
							value={location}
							onChangeText={setLocation}
							placeholderTextColor="darkgray"
						/>
						<TextInput
							style={styles.input}
							placeholder="Description"
							value={description}
							onChangeText={setDescription}
							placeholderTextColor="darkgray"
						/>
						<TextInput
							style={styles.input}
							placeholder="Select Date and Time Below"
							value={selectedEventDate ? `${selectedEventDate} ${time}` : ''}
							editable={false} // Disable editing for this input box
							placeholderTextColor="darkgray"
						/>
						{/* New Time and Date Picker ~EV */}
						<Button onPress={showDatepicker} title="Select Date" />
						<Button onPress={showTimepicker} title="Select Time" />
						{show && (
							<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode={mode}
								is24Hour={true}
								display="default"
								onChange={onChange}
								minimumDate={new Date(2024, 0, 1)}  // Set minimum date to 2024 ~EV
								maximumDate={new Date(2030, 10, 20)} // Set maximum date to 2030 ~EV
							/>
						)}

						<Button title="Create Event" onPress={userCreateEvent} />
						<TouchableOpacity
							style={styles.cancelButton} onPress={() => setModalVisible(false)}>
							<Text style={styles.cancelButtonText}>Cancel / Modify</Text>					{/* MODIFY BUTTON ~EV */}
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			{!modalVisible && (
				<TouchableOpacity
					style={styles.createButton}
					onPress={() => setModalVisible(true)}
				>
					<Text style={styles.createButtonText}>Create Event</Text>							{/* CREATE MODAL POP UP BUTTON ~EV */}
				</TouchableOpacity>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	modalView: {
		margin: 20,
		height: 450,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	input: {
		width: 300,
		height: 40,
		marginBottom: 12,
		borderWidth: 1.5,
		padding: 10,
		borderRadius: 10,
	},
	createButton: {
		backgroundColor: '#1E90FF',
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
	},
	createButtonText: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
	},
	cancelButton: {
		backgroundColor: 'purple',	// Changed from blue to red ~EV
		marginTop: 30,
		marginBottom: -30,
		paddingHorizontal: 25,
		paddingVertical: 4,
		borderRadius: 5,
	},
	cancelButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		textAlign: 'center',
	},
	datePickerText: {
		marginBottom: 10,
		color: '#1E90FF',
		fontSize: 18,
	},
});

export default CalendarScreen;