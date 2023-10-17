import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   head_navigation: {
//     flex: 1,
//     backgroundColor: '#3EAF92', //  배경
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'white', // 흰색 텍스트
// },
//   backButton: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    titleContainer: {
        width:"100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: 'red',
    },

    title: {
        width: "40%",
        height: "100%",
        resizeMode: 'contain'

    },

    titleText:{
        fontSize: 40,
        fontWeight: 'bold',
        color: "skyblue"
    },

    zipsaContainer: {
        width:"100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: 'orange',
    },

    zipsa: {
        fontSize: 10,
        fontWeight: 'bold',
        color: "black"
    },

    advContainer: {
        width:"100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'yellow',
    },

    advert: {
        resizeMode: 'stretch',
        width: 450,
        height: 85,
    },

    usingContainer: {
        width:"100%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: 'green',
    },

    iconContainer:{
        width:"100%",
        height: "22.5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        //backgroundColor: 'skyblue',
    },

    iconContainer2:{
        width:"100%",
        height: "22.5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        //backgroundColor: 'skyblue',
    },

    leftButton:{
        top:20,
        left: 25,
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        //borderWidth: 1,
        //borderRadius: 10,
        borderColor: "gray",
        marginHorizontal: 10
    },

    rightButton:{
        top:20,
        left: 45,
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        //borderWidth: 1,
        //borderRadius: 10,
        borderColor: "gray",
        marginHorizontal: 10
    },

    icon:{
        width: 102,
        height: 127,
    },
    
    icon2: {
        width: 120,
        height: 120,
    }


});

export default styles;
