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
        alignItems: 'center'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    buttonAdd: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 22,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },

    taskList: {
        marginTop: 32,
    },

    task: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16
    },

    taskProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },

    taskValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailsButtonText: {
        color: '#6904A7',
        fontSize: 15,
        fontWeight: 'bold'
    }
});