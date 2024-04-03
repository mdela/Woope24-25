import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, TextInput, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import {fetchWithToken} from '../util/fetchWithToken';
import { jwtDecode } from 'jwt-decode';
import {AccessToken, deleteToken} from "../util/token";
import {useIsFocused} from "@react-navigation/native";
import {AuthContext} from "../util/AuthContext";
import {Agenda} from 'react-native-calendars'; // Calendar ~EV
import { Card, Avatar } from 'react-native-paper';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {createEvent, deleteEvent, getEventsForMonth, getEventsOnDate, modifyEvent} from "../api/calendar";


interface Item {
	eventId: number;
	name: string;
	height: number;
	date: string;
	startTime: string;
	endTime: string;
	location: string;
	description: string;
}
interface EventItems {
	[date: string]: Item[];
}
// type Event = {
//     name: string;
//     date: string;
//     height: number;
//     startTime: string;
// 	endTime: string;
//     location: string;
// 	description: string;
// };


const CalendarScreen: React.FC = () => {

	const { userToken, setUserToken } = useContext(AuthContext);
	const decodedToken = userToken ? jwtDecode<AccessToken>(userToken) : null;
	const userId = decodedToken ? decodedToken.user_id : NaN;
	const [items, setItems] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState('');
	const now = new Date();
	const localMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [selectedDate, setSelectedDate] = useState(localMidnight);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [eventStartTime, setEventStartTime] = useState(new Date());
	const [startTime, setStartTime] = useState('');
	const [eventEndTime, setEventEndTime] = useState(new Date());
	const [endTime, setEndTime] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');

	const [isModifying, setIsModifying] = useState(false);
	const [eventId, setEventId] = useState<number | null>(null);




	//If this is not needed for backend it can be deleted
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
	const loadItems = async (day: any) => {
		if (!day) {
			return;
		}
		try {
			const year = day.year;
			const month = day.month;
			const events = await getEventsForMonth(year, month);
			const newItems: EventItems = {};

			events.forEach((event: any) => {
				const eventDate = new Date(event.start_time).toISOString().split('T')[0];
				if (!newItems[eventDate]) {
					newItems[eventDate] = [];
				}
				newItems[eventDate].push({
					eventId: event.event_id,
					name: event.title,
					date: eventDate,
					startTime: event.start_time,
					endTime: event.end_time,
					location: event.location,
					description: event.description,
					height: 100,
				});
			});

			setItems(newItems);
		} catch (error) {
			console.error('Error loading events:', error);
		}
	};

	const reloadCurrentMonthEvents = async () => {
		try {
			const currentYear = new Date().getFullYear();
			const currentMonth = new Date().getMonth() + 1;
			const events = await getEventsForMonth(currentYear, currentMonth);
			const newItems: EventItems = {};

			events.forEach((event: any) => {
				const eventDate = new Date(event.start_time).toISOString().split('T')[0]; // Extract the date part from the start_time
				if (!newItems[eventDate]) {
					newItems[eventDate] = [];
				}
				newItems[eventDate].push({
					eventId: event.event_id,
					name: event.title,
					date: eventDate,
					startTime: event.start_time,
					endTime: event.end_time,
					location: event.location,
					description: event.description,
					height: 100,
				});
			});

			setItems(newItems);
		} catch (error) {
			console.error('Error reloading current month events:', error);
		}
	};






	const userCreateEvent = async () => {

		//To check if all fields are filled
		if (!eventName || !eventDate || !startTime || !endTime || !location || !description) {
			alert('Please enter all details for the event.');
			return;
		}

		try {

			await createEvent(userId, eventName, description, location, startTime, endTime);

			// Reset form and close modal
			setEventName('');
			setEventDate('');
			setStartTime('');
			setEndTime('');
			setLocation('');
			setDescription('');
			setModalVisible(false);
			await reloadCurrentMonthEvents();
		} catch (error) {
			console.error('Error creating event:', error);
			alert('Error creating event');
		}
	};

	const handleDelete = async (eventId: number) => {
		try {
			await deleteEvent(eventId, userId);
			await reloadCurrentMonthEvents();
			alert('Event deleted successfully');

		} catch (error) {
			console.error('Error deleting event:', error);
			alert('Error deleting event');
		}
	};

	const handleModify = (item: Item) => {
		setIsModifying(true);
		setEventId(item.eventId);
		setEventName(item.name);
		setLocation(item.location);
		setDescription(item.description);
		setSelectedDate(new Date(item.date));
		setStartTime(item.startTime);
		setEndTime(item.endTime);

		setModalVisible(true);
	};

	const submitEventModification = async () => {
		if (eventId === null) {
			alert('Event ID is missing.');
			return;
		}

		try {
			await modifyEvent(
				eventId,
				userId,
				eventName,
				description,
				location,
				startTime,
				endTime
			);
			await reloadCurrentMonthEvents();
			alert('Event modified successfully');

		} catch (error) {
			console.error('Error modifying event:', error);
			alert('Error modifying event');
		}


		setIsModifying(false);
		setModalVisible(false);
		setEventId(null);
		resetForm();
	};



	const handleDateChange = (event: any, selectedDate: Date) => {
		if (selectedDate !== undefined) {
			const year = selectedDate.getFullYear();
			const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
			const day = ("0" + selectedDate.getDate()).slice(-2);
			setEventDate(`${year}-${month}-${day}`);
			setSelectedDate(selectedDate);
		}
	};

	const formatDateAndTime = (date: Date, time: Date) => {
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		const hours = ("0" + time.getHours()).slice(-2);
		const minutes = ("0" + time.getMinutes()).slice(-2);
		const seconds = ("0" + time.getSeconds()).slice(-2);

		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
	};

	const handleStartTimeChange = (event: any, selectedTime?: Date) => {
		if (selectedTime) {
			setEventStartTime(selectedTime);
			const formattedDateTime = formatDateAndTime(selectedDate, selectedTime);
			setStartTime(formattedDateTime);
		}
	};

	const handleEndTimeChange = (event: any, selectedTime?: Date) => {
		if (selectedTime) {
			setEventEndTime(selectedTime);
			const formattedDateTime = formatDateAndTime(selectedDate, selectedTime);
			setEndTime(formattedDateTime);
		}
	};

	//Changes format of event startTime and endTime so that its displayed in an easier to read way
	const formatTime = (timeString: string) => {
		const time = new Date(timeString);
		const isoString = time.toISOString();
		const isoTime = new Date(isoString);
		let hours = isoTime.getUTCHours();
		const minutes = isoTime.getUTCMinutes();
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours || 12;
		const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
		return `${hours}:${minutesStr} ${ampm}`;
	};




	const resetForm = () => {
		setEventName('');
		setLocation('');
		setDescription('');
		setSelectedDate(new Date());
		setStartTime('');
		setEndTime('');
		setIsModifying(false);
	};





	//show modal for viewing event details
	const [showModal, setShowModal] = useState(false);

	// Render Items
	const EventItem = ({ item, onModify, onDelete }: { item: Item; onModify: () => void; onDelete: () => void }) => {
		return (
			<TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
				<Card onPress={() => onModify()}>
					<Card.Content>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<Text style={{ fontWeight: 'bold' }}>
								{item.name} {'\n'}
								<Text style={{ fontSize: 12, fontWeight: 'normal' }}>
									Start: {formatTime(item.startTime)} {'\n'}
								</Text>
								<Text style={{ fontSize: 12, fontWeight: 'normal' }}>
									End: {formatTime(item.endTime)} {'\n'}
								</Text>

								<Text style={{ fontSize: 12, fontWeight: 'normal', fontStyle: 'italic' }}>
									{item.location}
								</Text>
							</Text>
							<Avatar.Text label="C" />
						</View>

						<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
							<Button title="Modify" onPress={() => handleModify(item)} />
							<Button title="Delete" onPress={() => handleDelete(item.eventId)} />
						</View>
					</Card.Content>
				</Card>
			</TouchableOpacity>
		);
	};

	const renderItem = (item: Item) => {
		return (
			<EventItem
				item={item}
				onModify={() => handleModify(item)}
				onDelete={() => handleDelete(item.eventId)}
			/>
		);
	};


	return (
		<SafeAreaView style={[styles.container, {backgroundColor: modalVisible ? 'white' : 'white'}]}>
			<Agenda
				items={items}
				loadItemsForMonth={loadItems}
				renderItem={renderItem}
				theme={{
					agendaDayTextColor: '#5EA1E9',
					agendaDayNumColor: '#5EA1E9',
					agendaTodayColor: '#5EA1E9',
					agendaKnobColor: '#5EA1E9'
				}}

				renderEmptyData={() => {
					return (
						<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

						<DateTimePicker
							testID="dateTimePicker"
							value={selectedDate}
							mode="date"
							is24Hour={true}
							display="default"
							onChange={handleDateChange}
						/>

						<Text>
							Start Time:
						</Text>

						<DateTimePicker
							testID="dateTimePicker"
							value={eventStartTime}
							mode="time"
							is24Hour={true}
							display="default"
							onChange={handleStartTimeChange}
						/>

						<Text>
							End Time:
						</Text>

						<DateTimePicker
							testID="dateTimePicker"
							value={eventEndTime}
							mode="time"
							is24Hour={true}
							display="default"
							onChange={handleEndTimeChange}
							format='y-MM-dd h:mm:ss a'
						/>

						{!isModifying && <Button title="Create Event" onPress={userCreateEvent} />}
						{isModifying && (
							<Button title="Save Changes" onPress={submitEventModification} />
						)}
						<TouchableOpacity
							style={styles.cancelButton}
							onPress={() => {
								setModalVisible(false);
								setIsModifying(false);
							}}
						>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			{!modalVisible && (
				<TouchableOpacity
					style={styles.createButton}
					onPress={() =>{
						resetForm();
						setModalVisible(true)}}
				>
					<Text style={styles.createButtonText}>Create Event</Text>
				</TouchableOpacity>
			)}
		</SafeAreaView>
	);
};


// };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
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
		borderWidth: 1,
		padding: 10,
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
		backgroundColor: '#1E90FF',
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