import { StyleSheet } from 'react-native';

const MailBoxStyle = StyleSheet.create({
    MainContainer: {
        flex: 1,
        padding: 20,
    },
    SelectContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
       // marginBottom: 20,
        height : '5%'
    },
    ListContainer: {
        flex: 1,
        height : '50%'
    },
    ListTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor : 'skyblue',
    },
    MessageContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    InputContainer: {
        marginBottom: 20,
    },
    ComposeTextInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        minHeight: 100,
        marginBottom: 10,
        backgroundColor : '#fff'
    },
    SendButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    SendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    
});


export default MailBoxStyle;



