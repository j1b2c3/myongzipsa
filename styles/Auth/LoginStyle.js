import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    titleContainer: {
        width:"100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: "skyblue"
    },

    imageContainer: {
        width:"100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain'
    },

    inputContainer: {
        width:"100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: "15%",
        width: "60%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        margin: 10
    },
    loginButton: {
        height: "15%",
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dcdcdc",
        marginTop: 20,
        borderRadius: 10,
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    subContainer: {
        width:"100%",
        height: "10%",
        justifyContent: "center",
        flexDirection: "row"
    },
    registerButton: {
        height: "50%",
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        marginHorizontal: 10
    },
    registerText: {
        fontSize: 15,
        color: "gray"
    },
    findContainer: {
        height: "50%",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray",
        marginHorizontal: 10
    },
});

export default styles;