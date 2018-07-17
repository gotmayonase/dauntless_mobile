import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles/Stylesheet'

const FormGroup = ( { label, value} ) => {

  return <View style={styles.formGroup}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>
      {value}
    </Text>
  </View>
}

export default FormGroup;