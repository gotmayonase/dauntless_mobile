import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  h1: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'flex-end'
  },
  value: {
    marginLeft: 10,
    fontSize: 16
  },
  formGroup: {
    flexDirection: 'row',
    marginBottom: 10
  },
  sectonHeader: {
    backgroundColor: '#ccc'
  }
});