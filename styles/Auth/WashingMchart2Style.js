import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop : '5%',
    width : '100%',
    height : '20%'
  },
  machine: {
    left: '12%',
    width: '50%',
    height: '85%',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
  },
  machine2: {
    right : '20%',
    width: '50%',
    height: '85%',
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
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -18.5}, { translateY: -17}],
    borderRadius: 50,
    width: '20%',
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