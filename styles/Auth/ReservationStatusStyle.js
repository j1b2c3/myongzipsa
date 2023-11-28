import { StyleSheet } from 'react-native';

const ReservationStatusStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    subContainer: {
        height: "80%",
        marginBottom: 20,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: "white",
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
        marginBottom: 20,
        fontWeight: 'bold',
        marginTop : 7,
        //backgroundColor: '#ccc', 
        //borderWidth: 2,
        //borderRadius: 3,
        //padding: 5, // 내용 주변에 공간 추가
    },
    infoText: {
        fontSize: 20,
        //backgroundColor: '#FFD700', 
        borderRadius: 10, 
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        
    }
});

export default ReservationStatusStyle;