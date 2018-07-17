import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';

import styles from '../Styles/Stylesheet'

import { listArmors, listWeapons, setGearSetPiece, listGearSet } from '../reducers';

export class GearBuilder extends React.Component {

  static navigationOptions = {
    title: 'Gear Builder'
  }

  componentDidMount() {
    this.props.listArmors();
    this.props.listWeapons();
  }

  get allPiecesSelected() {
    const gear = this.props.gearSet
    return gear.head && gear.weapon && gear.arms && gear.legs && gear.torso
  }

  setGearPiece = (key, type = 'armor') => value => {
    let item = this.props[type].find((item) => item.id == value)
    this.props.setGearSetPiece(key, item);
  }

  seeStats = () => {
    this.props.navigation.navigate('Detail')
  }

  render() {
    const { 
      head,
      arms,
      torso,
      legs,
      weapon,
      gearSet
    } = this.props;
    
    return (
      <View style={styles.container}>
        <View style={{padding: 15}}>
          <Text style={styles.label}>Helm</Text>
          <RNPickerSelect
            items={armorsToOptions(head)}
            onValueChange={this.setGearPiece('head')}
            style={pickerSelectStyles}
            value={gearSet.head && gearSet.head.id}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.label}>Arms</Text>
          <RNPickerSelect
            items={armorsToOptions(arms)}
            onValueChange={this.setGearPiece('arms')}
            style={pickerSelectStyles}
            value={gearSet.arms && gearSet.arms.id}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.label}>Torso</Text>
          <RNPickerSelect
            items={armorsToOptions(torso)}
            onValueChange={this.setGearPiece('torso')}
            style={pickerSelectStyles}
            value={gearSet.torso && gearSet.torso.id}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.label}>Legs</Text>
          <RNPickerSelect
            items={armorsToOptions(legs)}
            onValueChange={this.setGearPiece('legs')}
            style={pickerSelectStyles}
            value={gearSet.legs && gearSet.legs.id}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.label}>Weapon</Text>
          <RNPickerSelect
            items={armorsToOptions(weapon)}
            onValueChange={this.setGearPiece('weapon', 'weapon')}
            style={pickerSelectStyles}
            value={gearSet.weapon && gearSet.weapon.id}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Button
            onPress={this.seeStats}
            title="View Stats"
            accessibilityLabel="View Stats"
            disabled={!this.allPiecesSelected}
          />
        </View>
      </View>
    );
  }
}

armorsToOptions = (armors) => {
  return armors.map((armor) => { 
    return {
      label: armor.name, value: armor.id 
    }
  })
}



const mapStateToProps = state => {
  let storedArmors = state.armors.map(armor => ({ key: armor.id.toString(), ...armor }));
  let storedWeapons = state.weapons.map(weapon => ({ key: weapon.id.toString(), ...weapon }));
  return {
    head: storedArmors.filter((armor) => armor.type == 'head'),
    arms: storedArmors.filter((armor) => armor.type == 'arms'),
    torso: storedArmors.filter((armor) => armor.type == 'torso'),
    legs: storedArmors.filter((armor) => armor.type == 'legs'),
    weapon: storedWeapons,
    armor: storedArmors,
    gearSet: state.gearSet
  };
};

const mapDispatchToProps = {
  listArmors,
  listWeapons,
  setGearSetPiece,
  listGearSet
};

export default connect(mapStateToProps, mapDispatchToProps)(GearBuilder);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});