import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../Styles/Stylesheet'
import FormGroup from '../Components/FormGroup'

import { getWeaponDetail } from '../reducers'

class WeaponDetail extends Component {

  static navigationOptions = {
    title: 'Weapon Detail'
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.getWeaponDetail(id)
  }

  render() {
    const { selectedWeapon, loadingInfo } = this.props;
    if (loadingInfo) return <Text>Loading...</Text>;

    const {
      name,
      weapon_type,
      cell_slot_type_one,
      cell_slot_type_two,
      base_power,
    } = selectedWeapon

    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.h1}>{name}</Text>
        </View>
        <View style={{ marginLeft: 50 }}>
          <FormGroup label='Type' value={weapon_type} />
          <FormGroup label='Cell Slot' value={[cell_slot_type_one,cell_slot_type_two].join(', ')} />
          <FormGroup label='Base Power' value={base_power} />
          <FormGroup label='Element' value={this.elementalPowerValue} />
          <FormGroup label='Perk(s)' value={this.perkValue} />
        </View>
      </View>
    )
  }

  get perkValue() {
    const { selectedWeapon } = this.props;
    const {
      perk,
      perk_amount,
    } = selectedWeapon

    if (perk) {
      return `+${perk_amount} ${perk.name}`
    }
    return 'N/A'
  }

  get elementalPowerValue() {
    const { selectedWeapon } = this.props;
    const {
      elemental_power,
      elemental_power_amount,
    } = selectedWeapon

    if (elemental_power) {
      return `+${elemental_power_amount} ${elemental_power.name}`
    }
    return 'N/A'
  }

}

const mapStateToProps = ({ selectedWeapon, loadingInfo }) => ({
  selectedWeapon,
  loadingInfo
})

const mapDispatchToProps = {
  getWeaponDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponDetail);