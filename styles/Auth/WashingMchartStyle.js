import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    iconContainer:{
        width:"100%",
        height: "13.5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        //backgroundColor: 'skyblue',
    },

    leftButton:{
        top:40,
        left: 40,
        height: 80,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderRadius: 10,
        borderColor: "gray",
        marginHorizontal: 10
    },

    rightButton:{
        top:40,
        left: 90,
        height: 80,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderRadius: 10,
        borderColor: "gray",
        marginHorizontal: 10
    },
    icon:{
        width: 135,
        height: 80,
    },
})
export default styles;
