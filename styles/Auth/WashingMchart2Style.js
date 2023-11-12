import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  row: {
    left: 85,
    flexDirection: 'row',
    marginBottom: 3,
    marginTop : 20

  },
  machine: {
    width: 100,
    height: 120,
    //borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  machineImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  // machineContainer: {
  //   position: 'relative',
  // },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -18.5}, { translateY: -17}],
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
})
export default styles;
