import { StyleSheet } from 'react-native';

const UsageStatusStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    container1: {
        flex: 1,
    },
    container2: {
        width: "100%",
        height: "40%",
    },
    subContainer: {
        height: "80%",
        marginBottom: 20,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor:'white',
    },

    section: {
        marginBottom: 20,
        flexDirection: 'row',
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 5,
        marginRight: 8,
    },
    statusText: {
        fontSize: 24,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        //backgroundColor: '#ccc', 
        //borderWidth: 2,
        //borderRadius: 3, 
        padding: 5,
        marginBottom: 5,
    },
    infoText: {
        fontSize: 20,
        //backgroundColor: '#FFD700',
        textDecorationLine: 'underline',
        borderRadius: 10, 
    },
});

export default UsageStatusStyle;