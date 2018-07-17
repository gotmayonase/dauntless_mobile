import React, { Component } from 'react';
import { View } from 'react-native';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reactotron from 'reactotron-react-native';

import styles from '../Styles/Stylesheet'
import reducer from '../reducers';
import ArmorList from './ArmorList';
import ArmorDetail from './ArmorDetail';
import WeaponList from './WeaponList';
import WeaponDetail from './WeaponDetail';
import GearBuilder from './GearBuilder';
import GearSetDetail from './GearSetDetail';

import '../Config/ReactotronConfig'


const client = axios.create({
  baseURL: 'http://192.168.101.51:5000',
  responseType: 'json',
})

const store = Reactotron.createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const ArmorStack = createStackNavigator(
  {
    List: {
      screen: ArmorList
    },
    Detail: {
      screen: ArmorDetail
    }
  }
);

const WeaponStack = createStackNavigator(
  {
    List: {
      screen: WeaponList
    },
    Detail: {
      screen: WeaponDetail
    }
  }
);

const BuilderStack = createStackNavigator(
  {
    Builder: {
      screen: GearBuilder
    },
    Detail: {
      screen: GearSetDetail
    }
  }
);

const Tabs = createBottomTabNavigator(
  {
    'Gear Set': BuilderStack,
    Armor: ArmorStack,
    Weapons: WeaponStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Weapons') {
          iconName = `sword-cross`;
        } else if (routeName === 'Armor') {
          iconName = `shield`;
        } else if (routeName === 'Gear Set') {
          iconName = 'account-settings-variant'
        }
        return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}