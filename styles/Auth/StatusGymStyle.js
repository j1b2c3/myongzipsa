import { StyleSheet } from 'react-native';

const StatusGymStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateBox: {
        width: 300, // 가로 크기를 더 키움
        padding: 17, // 미세한 패딩 조정
        marginVertical: 10, // 여백을 더 늘림
        borderRadius: 8, // 더 부드러운 모서리
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // 그림자 효과
    },
    dateText: {
        fontSize: 24, // 더 큰 폰트 크기
        fontWeight: 'bold', // 굵은 글씨체
        color: '#555555', // 미세한 색조 변경
    },
    usageBox: {
        width: 300, // 가로 크기를 더 키움
        padding: 17, // 미세한 패딩 조정
        marginTop: 5, // 더 큰 상단 여백
        borderRadius: 12, // 더 부드러운 모서리
        backgroundColor: '#aaaaaa', // 미세한 색조 변경
        alignItems: 'flex-start',
    },
    noRecordContainer: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#f3f3f3', // Light gray background
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    noRecordText: {
        fontSize: 20,
        color: '#555555',
        fontWeight: 'bold', // Make it bold
        textAlign: 'center', // Center the text
    },
});

export default StatusGymStyle;