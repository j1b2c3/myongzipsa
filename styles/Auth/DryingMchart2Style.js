import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  row: {
    //left: 85,
    left: '12%',
    flexDirection: 'row',
    //marginBottom: 5,
    //marginTop : 20,
     marginTop : '5%',
    width : '100%',
    height : '20%'
  },
  machine: {
    // width: 100,
    // height: 120,
    width: '25%',
    height: '85%',
    //borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  machineImage: {
    flex: 1,
    resizeMode: 'contain',
    width : '100%',
    height : '100%'
  },
  // machineContainer: {
  //   position: 'relative',
  // },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    //transform: [{ translateX: -18.5}, { translateY: -17}],
    transform: [{ translateX: -18.5}, { translateY: -17}],
    borderRadius: '100%',
    // width: 40,
    // height: 40,
    width: '41%',
    height: '33%',
    
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
})
export default styles;