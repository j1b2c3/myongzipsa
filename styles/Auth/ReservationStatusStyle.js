import { StyleSheet } from 'react-native';

const ReservationStatusStyle = StyleSheet.create({
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
    statusText: {
        fontSize: 30,
        backgroundColor: '#ccc', // 배경색 추가 (예: 노란색)
        borderWidth: 2,
        borderRadius: 3, // 테두리를 둥글게 만들기
        //padding: 5, // 내용 주변에 공간 추가
    },
    infoText: {
        fontSize: 20,
        backgroundColor: '#FFD700', // 배경색 추가 (예: 노란색)
        borderRadius: 10, // 테두리를 둥글게 만들기
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 2,
        alignItems: 'center',
    }
});

export default ReservationStatusStyle;