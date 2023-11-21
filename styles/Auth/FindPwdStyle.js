import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    inputContainer: {
        width: 320,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 320,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 10,
    },
    input: {
        height: "35%",
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
    },
});

export default styles;