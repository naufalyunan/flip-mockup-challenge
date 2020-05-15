/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Transaction from './screens/Transaction'
import Detail from './screens/Detail'

const Stack = createStackNavigator();

const App = () => {
	return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="transaction">
          <Stack.Screen name="transaction" component={Transaction} options={{headerShown: false}}/>
          <Stack.Screen name="detail" component={Detail} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
	)
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});

export default App;
