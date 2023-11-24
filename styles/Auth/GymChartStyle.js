import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor:'white',
    },
    noticeBox: {
        margin: '5%',
        height: '60%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        padding: '3%',
    },
    header: {
        fontWeight: 'bold',
    },
    warning: {
        color: 'red',
    },
    noticText: {
        fontSize: 17
    },
    buttonContainer: {
        width: '90%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '5%'
    },
    button: {
        borderRadius: 360,
        paddingHorizontal: 20,
        margin : '1%',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    buttonText: {
        fontSize : 20,
    },
    usageInfoBox: {
        width: '90%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        padding: '2%',
    },
    usageInfoText1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    usageInfoText2: {
        fontSize: 40,
        backgroundColor : 'yellow'
    },
    imageContainer: {
        alignItems: 'center', 
        marginTop: '5%', 
    
    },
    image: {
        resizeMode : "contain",
        width: 200, 
        height: 200, 
    },


});

export default styles;
