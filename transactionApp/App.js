/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

// import Card from './screens/Card'
import Transaction from './screens/Transaction'

const App = () => {
	return (
    <>
      <SafeAreaView>
        <Transaction />
      </SafeAreaView>
    </>
	)
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});

export default App;
