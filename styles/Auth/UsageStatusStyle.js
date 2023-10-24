import { StyleSheet } from 'react-native';

const UsageStatusStyle = StyleSheet.create({
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
        backgroundColor: '#ccc', 
        borderWidth: 2,
        borderRadius: 3, 
        //padding: 5, // 내용 주변에 공간 추가
    },
    infoText: {
        fontSize: 20,
        backgroundColor: '#FFD700', 
        borderRadius: 10, // 테두리를 둥글게 만들기
    },
});

export default UsageStatusStyle;