import { mdiStairsDown } from '@mdi/js';
import React, {useState} from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaViewComponent, Button, Modal} from 'react-native';
import {Avatar, Surface, Icon, IconButton, Text, Card} from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResourceScreen = () => {

    const image = require('../../assets/csun.png');

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView>
            
            <View style={styles.containerLeft}>
            
                <Surface style={styles.surfaceLeft} elevation={4}>
                    <IconButton 
                        style={styles.avatarLeft} icon={'home'}
                        onPress={() => setModalVisible(true)}
                    ></IconButton>
                    
                </Surface>
                <View>
                <Text style={styles.text} variant="displayLarge">Display Large</Text>
                </View>
                
                <View>
                    <Modal 
                        visible={modalVisible}
                        onDismiss={() => setModalVisible(false)}
                    

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                               <Card>
                                    <Card.Content>
                                        <View>
                                            <Text>Testing</Text>
                                        </View>
                                    </Card.Content>
                               </Card>
                            </View>
                        </View>
                    </Modal>

                </View>
                

                <Surface style={styles.surfaceLeft} elevation={4}>
                    <IconButton style={styles.avatarLeft} icon={'beaker'}></IconButton>
                </Surface>

                <Surface style={styles.surfaceLeft} elevation={4}>
                    <IconButton style={styles.avatarLeft} icon={'briefcase'}></IconButton>
                </Surface>

            </View>
            <View style={styles.containerRight}>
                <Surface style={styles.surfaceRight} elevation={4}>
                    <IconButton style={styles.avatarLeft} icon={'human-male-female-child'}></IconButton>
                </Surface>

                <Surface style={styles.surfaceRight} elevation={4}>
                    <IconButton style={styles.avatarLeft} icon={'tent'}></IconButton>
                </Surface>

                <Surface style={styles.surfaceRight} elevation={4}>
                    <IconButton style={styles.avatarLeft} icon={'gavel'}></IconButton>
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
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',

      },
});

export default ResourceScreen;
