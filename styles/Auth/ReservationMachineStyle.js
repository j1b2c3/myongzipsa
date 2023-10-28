import { StyleSheet } from 'react-native';

const ReservationMachineStyle = StyleSheet.create({
    container: {
        padding: 20,

    },
    subContainer: {
        marginBottom: 20,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
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
    infoText: {
        fontSize: 20,
        backgroundColor: '#FFD700', 
        borderRadius: 10, 
    },
    Button: {
        width: 170,
        height: 40,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        
    },
    ButtonText:{
        fontSize: 15,
    }

});

export default ReservationMachineStyle;