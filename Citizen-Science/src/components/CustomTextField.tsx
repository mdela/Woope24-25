// CustomTextField.tsx

import React from 'react';
import {TextInput, ViewStyle, StyleSheet, Dimensions} from 'react-native';
import { TextFieldProps } from '../types';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const CustomTextField: React.FC<TextFieldProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    borderColor = '#000', // Default color
    borderRadius = 5,
    position,
}) => {
    const textFieldStyle: ViewStyle = {
        width: windowWidth > 500? "50%" : "80%",
        height: windowWidth > 500? "7%" : "8%",
        borderColor,
        borderRadius,
        borderWidth: 1,
        paddingHorizontal: 10, // Padding inside the text field
        position:'absolute',
        left: position.horizontal,
        top: position.vertical,
        // Add other styles as needed
    };

    return (
        <TextInput
            style={textFieldStyle}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            // Include other TextInput properties here
        />
    );
};

export default CustomTextField;