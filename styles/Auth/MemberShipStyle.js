import { StyleSheet } from 'react-native';

const MemberShipStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  titleContainer:{
    width:"100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: "skyblue"
  },

  inputContainer:{
    width:"100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  }
  ,
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 17,
    paddingLeft: 8,
  },

  picker: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 17,
    paddingLeft: 8,
    backgroundColor: 'white'
  },

  SignUpContainer:{
    width:"100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  }
  ,
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MemberShipStyle;



