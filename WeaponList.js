import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './Stylesheet'

import { listWeapons } from './reducers';

export class WeaponList extends React.Component {

  static navigationOptions = {
    title: 'Weapon List'
  }

  componentDidMount() {
    this.props.listWeapons();
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
    const { weapons } = this.props;
    return (
      <FlatList style={styles.container} data={weapons} renderItem={this.renderItem} />
    );
  }
}

const mapStateToProps = state => {
  let storedWeapons = state.weapons.map(weapon => ({ key: weapon.id.toString(), ...weapon }));
  return {
    weapons: storedWeapons
  };
};

const mapDispatchToProps = {
  listWeapons
};

export default connect(mapStateToProps, mapDispatchToProps)(WeaponList);