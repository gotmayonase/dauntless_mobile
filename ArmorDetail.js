import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './Stylesheet'
import FormGroup from './FormGroup'

import { getArmorDetail } from './reducers'

class ArmorDetail extends Component {

  static navigationOptions = {
    title: 'Armor Detail'
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getArmorDetail(id)
  }

  get elementalResistanceValue() {
    const { selectedArmor } = this.props;
    const {
      elemental_resistance,
      elemental_resistance_amount,
    } = selectedArmor

    if(elemental_resistance) {
      return `+${elemental_resistance_amount} ${elemental_resistance.name}`
    }
    return 'N/A'
  }

  get elementalWeaknessValue() {
    const { selectedArmor } = this.props;
    const {
      elemental_weakness,
      elemental_weakness_amount,
    } = selectedArmor

    if (elemental_weakness) {
      return `-${elemental_weakness_amount} ${elemental_weakness.name}`
    }
    return 'N/A'
  }

  get perkValue(){
    const { selectedArmor } = this.props;
    const {
      perk,
      perk_amount,
    } = selectedArmor

    if (perk) {
      return `+${perk_amount} ${perk.name}`
    }
    return 'N/A'
  }

  render() {
    const { selectedArmor, loadingInfo } = this.props;
    if (loadingInfo) return <Text>Loading...</Text>;

    const {
      name,
      type,
      cell_slot,
      base_armor,
    } = selectedArmor

    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.h1}>{name}</Text>
        </View>
        <View style={{marginLeft: 50}}>
          <FormGroup label='Type' value={type} />
          <FormGroup label='Cell Slot' value={cell_slot} />
          <FormGroup label='Base Armor' value={base_armor} />
          <FormGroup label='Resists' value={this.elementalResistanceValue} />
          <FormGroup label='Weakness' value={this.elementalWeaknessValue} />
          <FormGroup label='Perk(s)' value={this.perkValue} />
        </View>
      </View>
    )
  }

}

const mapStateToProps = ({ selectedArmor, loadingInfo }) => ({
  selectedArmor,
  loadingInfo
})

const mapDispatchToProps = {
  getArmorDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmorDetail);