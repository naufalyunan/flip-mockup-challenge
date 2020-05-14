import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Card = () => {
	return (
		<TouchableOpacity style={styles.container}>
			<Text>Card</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: wp(90),
		height: hp(20),
		backgroundColor: 'red',
		margin: 10,
		borderRadius: 10,
		padding: 10
	}
})

export default Card
