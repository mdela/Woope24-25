// Refer to the following StyleSheet Documentation:
// https://reactnative.dev/docs/stylesheet

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    title: {
            fontSize: 45,
            fontWeight: 'bold',
            color: '#fff',
    },
    subtitle: {
        fontSize: 40,
        fontWeight: 'normal',
        color: '#fff',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    backgroundColor: {
        flex: 1,
        backgroundColor: '#3a9bdc',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default styles;
