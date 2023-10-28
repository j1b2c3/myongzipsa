import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        margin: 30,
        flex: 1,
        paddingHorizontal: 16,
    },
    InputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
});

export default styles;