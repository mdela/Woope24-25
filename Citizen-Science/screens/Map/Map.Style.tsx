import {StyleSheet}from 'react-native';
export const mapStyle = StyleSheet.create({
    flex: {
        flex:1
    },
    fab: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 32
    },
    map: {
        width: "100%",
        height: "100%",
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      saveButton: {
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
      },
})