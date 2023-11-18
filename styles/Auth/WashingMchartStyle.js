import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    // <<<<<<< main
    iconContainer: {
        width: "100%",
        height: "13.5%",
        justifyContent: "flex-start",
        flexDirection: "row",
        //backgroundColor: 'skyblue',
    },

    leftButton: {
        top: 40,
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

    leftButton1: {
        top: 90,
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

    rightButton: {
        top: 40,
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

    icon: {
        width: 135,
        height: 150,
    },
    // ======= front부분
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: "100%",
        height: "19%",
        justifyContent: "flex-start",
        flexDirection: 'row',
        marginBottom: 3,
    },
    blank: {
        width: "100%",
        height: "2.5%",
    },

    machine: {
        width: "28%",
        height: "85%",
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    machine1: {
        width: "35%",
        height: "85%",
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    machine2: {
        width: "28%",
        height: "85%",
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    machineImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    overlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -18.5 }, { translateY: -17 }],
        borderRadius: 50,
        width: 40,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    // >>>>>>> front
})
export default styles;
