import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from './../store/actions'

import Card from './Card'

const Transaction = () => {
	const [localList, setLocalList] = useState(null)
	const transactions = useSelector(state => state.transactions.transactions)
	const dispatch = useDispatch()

	useEffect(() => {
		const url = 'https://nextar.flip.id/frontend-test'
		dispatch(fetchTransactions(url))
	},[dispatch])

	if(transactions.length === 0) return (
		<SafeAreaView style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: wp(100), height: hp(100)}}>
			<Text style={{fontSize: 20}}>Fetching...</Text>
		</SafeAreaView>
	)

	return (
		<SafeAreaView>
			<View style={{ display: 'flex', width: wp(100), justifyContent: 'center', alignItems: 'center', backgroundColor: '#e5e5e5' }}>
				<View style={styles.utilCont}>
					<TextInput 
						placeholder="Cari nama, bank, atau nominal"
						style={styles.TextInput}
						onChangeText={text => {
							let lowCase = text.toLowerCase()
							let newTransactions = transactions.map(el => el)
							let filtered = newTransactions.filter(el => {
								if(el[Object.keys(el)[0]].beneficiary_name.toLowerCase().includes(lowCase) || 
									 el[Object.keys(el)[0]].amount.toString().toLowerCase().includes(lowCase) || 
									 el[Object.keys(el)[0]].beneficiary_bank.toLowerCase().includes(lowCase) ||
									 el[Object.keys(el)[0]].sender_bank.toLowerCase().includes(lowCase)){
										 return el
									 }
							})
							setLocalList(filtered)
						}}
					/>
					<TouchableOpacity style={styles.filter}>
					</TouchableOpacity>
				</View>
			</View>
			<FlatList 
				data={localList === null ? transactions : localList}
				renderItem={({ item }) => (
					<Card transaction={item} id={Object.keys(item)[0]} />
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
		width: wp(90),
		height: hp(10),
		backgroundColor: '#e5e5e5',
		display: "flex",
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	TextInput: {
		width: wp(70),
		height: hp(5),
		backgroundColor: '#fff',
		padding: 5,
		borderRadius: 5
	},
	filter: {
		width: wp(15),
		height: hp(5),
		backgroundColor: '#000'
	},
	cardCont: {
		width: wp(100),
		height: hp(90),
		backgroundColor: '#e5e5e5'	
	}
})

export default Transaction
