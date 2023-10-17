import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        margin: 30,
        flex: 1,
        //justifyContent: 'center',
        paddingHorizontal: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        padding: 8,
        borderRadius: 10,

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 10,
    },
    FindIDContainer: {
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    }
});

export default styles;