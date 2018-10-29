import { Constants } from 'expo';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    justifyContent: 'space-around',
    // justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  containerHome: {
    flex: 1,
    justifyContent: 'space-around',
    padding: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },  
  header: {
    margin: 6,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  number: {
    margin: -15,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6cc',
  },
  paragraph: {
    margin: 6,
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  listItem:{
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput:{
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000'
  },

});

export { styles }