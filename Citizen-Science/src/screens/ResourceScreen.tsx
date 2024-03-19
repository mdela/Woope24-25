import { mdiStairsDown } from '@mdi/js';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResourceScreen = () => {

    const image = require('../../assets/splashh.png');

    return (
        <SafeAreaView>
         <View style={styles.container}>
            {/* <View style={styles.avatarLeft }>
                <Avatar.Image size={100} source={('/csun.png')} />
            </View>
            <View style={styles.avatarRight}>
                <Avatar.Image size={100} source={('/csun.png')} />
            </View> } */}

            <Surface style={styles.surface} elevation={4}>
                <Avatar.Image style={styles.avatarLeft} size={100} source={('Citizen-Science/assets/splashh.png')} />
            </Surface>
            

        </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 28,
        color: '#232f46',
    },
    avatarLeft: {
        backgroundColor: 'white',
       marginRight: 150,
       marginBottom: 150,
    },
    avatarRight: {
        
        paddingLeft: 200,
       
    },
    surface: {
        backgroundColor: 'white',
        padding: 10,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginRight: 300,
        paddingTop: 150,
        paddingLeft: 150,
      },
});

export default ResourceScreen;
