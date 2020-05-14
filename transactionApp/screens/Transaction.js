import React from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from './../store/actions'

const Transaction = () => {
	return (
		<SafeAreaView>
			<Text>Transaction</Text>
			<View style={styles.utilCont}>
				<TextInput 
					placeholder="Type here"
					style={styles.TextInput}
				/>
				<TouchableOpacity style={styles.filter}>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	utilCont: {
		width: wp(100),
		height: hp(10),
		backgroundColor: 'orange',
		display: "flex",
		flexDirection:'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	TextInput: {
		width: wp(70),
		height: hp(5),
		backgroundColor: 'blue'
	},
	filter: {
		width: wp(15),
		height: hp(5),
		backgroundColor: 'maroon'
	}
})

export default Transaction
