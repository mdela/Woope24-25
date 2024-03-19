import { mdiStairsDown } from '@mdi/js';
import React from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaViewComponent, Button } from 'react-native';
import {Avatar, Surface, Icon, IconButton, Text} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResourceScreen = () => {

    const image = require('../../assets/csun.png');

    return (
        <SafeAreaView>
            
            <View style={styles.containerLeft}>
            
                <Surface style={styles.surfaceLeft} elevation={4}>
                    <IconButton style={styles.avatarLeft} icon={'home'}></IconButton>
                    
                </Surface>
                <View>
                <Text style={styles.text} variant="displayLarge">Display Large</Text>
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
});

export default ResourceScreen;
