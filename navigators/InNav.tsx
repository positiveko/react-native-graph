import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import { BLACK_COLOR } from '../colors';
import Detail from '../components/Detail';
import Home from '../screens/Home';

type RootStackParamList = {
  Coin: undefined;
  Detail: {
    symbol: string;
    id: string;
  };
};

export type StackScreenProp = NativeStackNavigationProp<RootStackParamList>;

const Nav = createNativeStackNavigator<RootStackParamList>();

const InNav = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: 'modal',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: BLACK_COLOR,
      },
    }}>
    <Nav.Screen name='Coin' component={Home} />
    <Nav.Screen name='Detail' component={Detail} />
  </Nav.Navigator>
);

export default InNav;
