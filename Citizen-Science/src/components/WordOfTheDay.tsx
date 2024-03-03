import React, { useRef, useState } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package

interface WordOfTheDay {
    word: string;
    definition: string;
    bannerTop: number;
    iconTop: number;
}

const WordOfTheDayBanner: React.FC<WordOfTheDay> = ({ word, definition ,bannerTop, iconTop}) => {
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(true);
    const bannerWidth = Dimensions.get('window').width;
    const hiddenPosition = -bannerWidth + 50;
    const slideAnim = useRef(new Animated.Value((Dimensions.get('window').width - bannerWidth) / 2)).current;

    const toggleBanner = () => {
        if (!expanded) {
            Animated.timing(slideAnim, {
                toValue: (Dimensions.get('window').width - bannerWidth) / 2,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: hiddenPosition,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setVisible(false));
        }
        setExpanded(!expanded);
    };

    const showBanner = () => {
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: (Dimensions.get('window').width - bannerWidth) / 2,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            {visible && (
                <TouchableWithoutFeedback onPress={toggleBanner}>
                    <Animated.View style={[styles.banner, { width: bannerWidth, transform: [{ translateX: slideAnim }], top: bannerTop }]}>
                        <Text style={styles.word}>Word of the day: </Text>
                        <Text style={styles.actualWord}>{word}</Text>
                        {expanded && <Text style={styles.definition}>Meaning: {definition}</Text>}
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}
            {!visible && (
                <TouchableOpacity style={[styles.showButton, { top: iconTop }]} onPress={showBanner}>
                    <Icon name="weather-sunset" size={30} color="#FFCC00" />
                </TouchableOpacity>
            )}
        </>
    );
};


const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        backgroundColor: '#FFCC00',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
    word: {
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'red',
    },
    actualWord: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'red',
    },
    definition: {
        fontSize: 16,
        marginTop: 10,
        color: 'red',
    },
    showButton: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent',
        padding: 10,
    },
});

export default WordOfTheDayBanner;
