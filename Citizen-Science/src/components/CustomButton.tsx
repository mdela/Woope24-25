// CustomButton.tsx

import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, Dimensions } from 'react-native';
import { ButtonProps } from '../types';
import styles from '../StyleSheet';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const CustomButton: React.FC<ButtonProps> = ({
    label,
    labelColor,
    backgroundColor = 'blue',
    onPress,
    position,
    borderRadius = 10, //default value. Like that all buttons look the same
    borderColor,
    borderWidth,
    disabled = false,
    textSizeMultiplier = 0.06,
}) => {
    const buttonStyle: ViewStyle = {
        ...styles.button,
        width: windowWidth > 500? "50%" : "80%",
        height: windowWidth > 500? "7%" : "8%",
        backgroundColor,
        borderRadius,
        borderColor,
        borderWidth,
        position: 'absolute',
        left: position.horizontal,
        top: position.vertical,
        opacity: disabled ? 0.5 : 1
    };
    const textStyle: TextStyle = {
        ...styles.buttonText,
        color: labelColor,
        fontSize: windowWidth * textSizeMultiplier,
    };


    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled}>
            <Text style={textStyle}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;