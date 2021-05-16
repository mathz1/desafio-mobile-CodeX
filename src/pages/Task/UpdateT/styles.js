import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 70,
    },

    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Constants.statusBarHeight + 70
    },

    headerText: {
        marginTop: 14,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    },

    label: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: Constants.statusBarHeight + 70
    },

    labelText: {
        marginTop: 14,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#999',
        marginBottom: 15,
        marginHorizontal: 20,
    },

    textInput: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
        color: '#FFF',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16,
    },

    inputIOS: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },

    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        // borderColor: '#6904A7',
        borderRadius: 8,
        color: '#FFF',
        paddingRight: 30,
        marginBottom: 15,
        marginHorizontal: 20,
    },

    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#6904A7',
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },

    signUp: {
        padding: 10,
        marginTop: 20
    },

    signUpText: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
});