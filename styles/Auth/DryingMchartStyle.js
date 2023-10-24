import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    iconContainer:{
        width:"100%",
        height: "13.5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        //backgroundColor: 'skyblue',
    },

    iconContainer2:{
        width:"100%",
        height: "14%",
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
        borderWidth: 1,
        borderRadius: 10,
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
})
export default styles;
