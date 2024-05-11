import { mdiStairsDown } from '@mdi/js';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaViewComponent, Button,TextInput, Modal, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {Avatar, Surface, Icon, IconButton, Text, Card} from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ResourceScreen = () => {

    interface Item {
        resourceId: number;
        name: string;
        description: string;
        category: string,
        
    }

    const [currentCategory, setCurrentCategory] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const image = require('../../assets/csun.png');
    const { width, height } = Dimensions.get('window');
    const [category, setCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [cat, setCat] = useState([
    
        {label: 'Home', value: 'Home'},
        {label: 'Family', value: 'Family'},
        {label: 'Science', value: 'Science'},
        {label: 'Culture', value: 'Culture'},
        {label: 'Law', value: 'Law'},
        {label: 'Jobs', value: 'Jobs'}
    ]);

    const [resources, setResources] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

   // Load items when the component mounts
   useEffect(() => {
    const loadItems = async () => {
        try {
            const itemsString = await AsyncStorage.getItem('@items');
            const loadedItems = itemsString ? JSON.parse(itemsString) : [];
            setItems(loadedItems);
        } catch (e) {
            console.error("Failed to load items:", e);
        }
    };

    loadItems();
}, []);

const handleAddItem = async () => {
    const newItem: Item = {
        resourceId: Math.random(),  // Simple unique ID generation for demo
        name: title,
        description: description,
        category: category
    };

    try {
        const newItems = [...items, newItem];
        const itemsString = JSON.stringify(newItems);
        await AsyncStorage.setItem('@items', itemsString);
        setItems(newItems);
        setTitle('');
        setDescription('');
        setCategory('');
        setModalVisible(false);
    } catch (e) {
        console.error("Failed to save item:", e);
    }
};

    return (
        <SafeAreaView>
            <IconButton 
                icon={'plus'} 
                style={{marginLeft: 350}} onPress={() => setAddModalVisible(true)} />
            <View>
                
                <Modal 
                    visible={addModalVisible}
                    onDismiss={() => setAddModalVisible(false)}
                    transparent={true}
                >
                    <View style={styles.centeredView}>
                        <View style={{
                            width: width * 0.95, // Apply width here
                            height: height * 0.75, // Apply height here
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '110%', paddingHorizontal: 10}}>
                                <IconButton  icon={"close"} onPress={() => setAddModalVisible(false)} style={{marginLeft: 0, alignSelf: 'flex-start' }}/>
                                <IconButton icon='plus' onPress={() =>{ handleAddItem(); setAddModalVisible(false);}}></IconButton>
                            </View>
                            <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor={'darkgray'}
                            />
                            <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            placeholderTextColor="darkgray"
                            />

                                <DropDownPicker
                                    style={{alignSelf: 'center', width: "70%"}}
                                    open={open}
                                    value={category}
                                    items={cat}
                                    setOpen={setOpen}
                                    setValue={setCategory}
                                    setItems={setCat}
                                    zIndex={1000}  // Ensure dropdown is layered above other components
                                    placeholder='Category'
                                />
                          

                            
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.containerLeft}>
                <Surface style={styles.surfaceLeft} elevation={4}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton 
                        style={styles.avatarLeft} icon={'home'}
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentCategory('Home');}}
                    ></IconButton>
                        
                    </View>
                </Surface>
                
                <View>
               
                    <Modal 
                        visible={modalVisible}
                        onDismiss={() => setModalVisible(false)}
                        transparent={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={{
                            width: width * 0.95, // Apply width here
                            height: height * 0.75, // Apply height here
                            backgroundColor: 'white',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <View style={{marginRight: 130}}>
                                    <IconButton  icon={"close"} onPress={() => setModalVisible(false)}/>
                                    </View>
                                    <View style={{marginRight: 180}}>
                                    <Text>{currentCategory}</Text>
                                    </View>

                                     
                                    
                                </View>
                                

                                
                            
                            <View style={{width: '100%'}}>
                            <ScrollView style={{ width: '100%', backgroundColor: 'transparent', zIndex: 1, height: '90%', marginBottom: 0}}> 
                            {items.filter(item => item.category === currentCategory).map((item, index) => (
                                
                                <TouchableOpacity style={{marginRight: 10, marginTop: 17, width: '100%'}}>
                                <Card key={index} style={{flex: 1}}> 
                                    <Card.Content>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>

                                        
                                        <View
                                                style={{
                                                    flexDirection: 'column',
                                                    
                                                    //alignItems: 'center',
                                                    
                                                    
                                                }}>
                                        <Text>{item.name}</Text>
                                        <Text>{item.description}</Text>
                                        
                                        </View>
                                        <Avatar.Text label="C"/>
                                                                                  
                                            
                                        </View>
                                    </Card.Content>
                                </Card>
                                </TouchableOpacity>
                                
            ))}
            </ScrollView>
                             </View>
                            </View>
                        </View>
                    </Modal>

                </View>
                

                <Surface style={styles.surfaceLeft} elevation={4}>
                    <IconButton 
                        style={styles.avatarLeft} 
                        icon={'beaker'} 
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentCategory('Science')}}
                    
                    />
                </Surface>

                <Surface style={styles.surfaceLeft} elevation={4}>
                    <IconButton 
                        style={styles.avatarLeft} 
                        icon={'briefcase'}
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentCategory('Jobs')}}
                    />
                </Surface>

            </View>
            <View style={styles.containerRight}>
                <Surface style={styles.surfaceRight} elevation={4}>
                    <IconButton 
                        style={styles.avatarLeft} 
                        icon={'human-male-female-child'}
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentCategory('Family')}}
                        />
                </Surface>

                <Surface style={styles.surfaceRight} elevation={4}>
                    <IconButton 
                        style={styles.avatarLeft} 
                        icon={'tent'}
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentCategory('Culture')}}
                        />
                </Surface>

                <Surface style={styles.surfaceRight} elevation={4}>
                    <IconButton 
                        style={styles.avatarLeft} 
                        icon={'gavel'}
                        onPress={() => {
                            setModalVisible(true);
                            setCurrentCategory('Law')}}
                        />
                </Surface>

            </View>
            
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    containerLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    
    },
    containerRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
    },

    text: {
        
        fontSize: 24,
        color: '#000',
                alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginRight: 300,
        paddingTop: 150,
        paddingLeft: 150,
    },
    avatarLeft: {
       backgroundColor: 'white',
       marginRight: 150,
       marginBottom: 150,
    },
    avatarRight: {
        backgroundColor: 'white',
        
        marginLeft: 150,
        marginBottom: 150,
       
    },
      surfaceRight: {
        flex: 1,
        backgroundColor: 'white',
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginLeft: 100,
        paddingTop: 150,
        paddingLeft: 150,
      },
      surfaceLeft: {
        flex: 1,
        backgroundColor: 'white',
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginRight: 300,
        paddingTop: 150,
        paddingLeft: 150,
      },
      surfaceight: {
        backgroundColor: 'white',
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginLeft: 100,
        paddingTop: 150,
        paddingLeft: 150,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for a semi-transparent background
    },
    input: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 30,
		paddingHorizontal: 10,
		width: 250,
		backgroundColor: 'white',
	  },
      pickerStyle: {
        width: 250,
        height: 50,
    },
    modalTitle: {
        fontSize: 15,
        color: '#000',
        marginTop: 15,
        paddingLeft: 150
    },
});

export default ResourceScreen;
