import React from 'react';
import { Text, View, SectionList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../Styles/Stylesheet'

import { listArmors, listWeapons, listGearSet } from '../reducers';
import FormGroup from '../Components/FormGroup';

export class GearSetDetail extends React.Component {

  static navigationOptions = {
    title: 'Gear Stats'
  }

  componentDidMount() {
    this.props.listArmors();
    this.props.listWeapons();
    this.props.listGearSet();
  }

  render() {
    const {
      head,
      arms,
      torso,
      legs,
      weapon
    } = this.props;

    return (
      <View style={styles.container}>
        <FormGroup label="Head" value={head.name} />
        <FormGroup label="Arms" value={arms.name} />
        <FormGroup label="Torso" value={torso.name} />
        <FormGroup label="Legs" value={legs.name} />
        <FormGroup label="Weapon" value={weapon.name} />
        <SectionList
          style={styles.container}
          sections={[
            { title: 'Perks', data: this.groupedAssociationValues('perk')},
            { title: 'Resistances', data: this.groupedAssociationValues('elemental_resistance') },
            { title: 'Weaknesses', data: this.groupedAssociationValues('elemental_weakness', false) },
            { title: 'Power', data: this.groupedAssociationValues('elemental_power') },
          ]}
          renderItem={this.renderAssociationItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={(item,index) => index}
        />
        
      </View>
    );
  }

  renderAssociationItem = ({ item }) => {
    return <View style={styles.item}>
        <Text>{item.positive ? '+' : '-'}{item.amount} {item.association.name}</Text>
      </View>
  }

  renderSectionHeader = ({section}) =>{
    return <Text style={[styles.item,styles.label,styles.sectonHeader]}>{section.title}</Text>
  }

  groupedAssociationValues(key, positive = true) {
    const {
      head,
      arms,
      torso,
      legs,
      weapon
    } = this.props;
    let collection = [head, arms, torso, legs, weapon].reduce((acc, item) => {
      const association = item[key];
      const amount = item[`${key}_amount`];
      if (association) {
        if(acc[association.id])
          acc[association.id].amount += amount;
        else
          acc[association.id] = {
            amount,
            association,
            positive
          }
      }
      return acc
    }, {})
    return Object.values(collection);
  }
}

const mapStateToProps = state => {
  const storedArmors = state.armors.map(armor => ({ key: armor.id.toString(), ...armor }));
  const storedWeapons = state.weapons.map(weapon => ({ key: weapon.id.toString(), ...weapon }));
  return {
    ...state.gearSet,
    weapons: storedWeapons,
    armors: storedArmors
  };
};

const mapDispatchToProps = {
  listArmors,
  listWeapons,
  listGearSet
};

export default connect(mapStateToProps, mapDispatchToProps)(GearSetDetail);
