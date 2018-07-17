import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './Stylesheet'

import { listArmors } from './reducers';

export class ArmorList extends React.Component {

  static navigationOptions = {
    title: 'Armor List'
  }

  componentDidMount() {
    this.props.listArmors();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => this.props.navigation.navigate('Detail', { id: item.id })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    const { armors } = this.props;
    return (
      <FlatList style={styles.container} data={armors} renderItem={this.renderItem} />
    );
  }
}

const mapStateToProps = state => {
  let storedArmors = state.armors.map(armor => ({ key: armor.id.toString(), ...armor }));
  return {
    armors: storedArmors
  };
};

const mapDispatchToProps = {
  listArmors
};

export default connect(mapStateToProps, mapDispatchToProps)(ArmorList);