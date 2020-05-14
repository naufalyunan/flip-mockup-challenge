import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from './../store/actions'

import Card from './Card'

const Transaction = () => {
	const transactions = useSelector(state => state.transactions.transactions)
	const dispatch = useDispatch()

	useEffect(() => {
		const url = 'https://nextar.flip.id/frontend-test'
		dispatch(fetchTransactions(url))
	},[dispatch])

	if(transactions.length === 0) return <Text>Fetching...</Text>

	console.log(transactions)
	return (
		<SafeAreaView>
			<View style={styles.utilCont}>
				<TextInput 
					placeholder="Type here"
					style={styles.TextInput}
				/>
				<TouchableOpacity style={styles.filter}>
				</TouchableOpacity>
			</View>
			<FlatList 
				data={transactions}
				renderItem={({ item }) => (
					<Card transaction={item} />
				)}
				keyExtractor={(item) => item[Object.keys(item)[0]].id}
				style={ styles.cardCont }
				contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
			/>
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
	},
	cardCont: {
		padding: 10,
		width: wp(100),
		height: hp(90),
		backgroundColor: 'green'	
	}
})

export default Transaction
