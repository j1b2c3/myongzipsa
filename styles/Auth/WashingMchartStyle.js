import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex : 1,
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
