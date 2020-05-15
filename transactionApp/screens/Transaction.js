import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, FlatList } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions, setTransactions } from './../store/actions'
//picker selector
import RNPickerSelect from 'react-native-picker-select';

import Card from './Card'

const Transaction = () => {
	//for filtering
	const [localList, setLocalList] = useState(null)
	//for sorting value
	const [sort, setSort] = useState('')
	//initial array from redux
	const transactions = useSelector(state => state.transactions.transactions)
	const dispatch = useDispatch()

	useEffect(() => {
		const url = 'https://nextar.flip.id/frontend-test'
		dispatch(fetchTransactions(url))
	},[dispatch])

	//sorting function
	const sortTrans = (value) => {
		if(value === 'name_asc') {
			if(localList === null){
				//if using array transactions
				const sorted = transactions.sort((a,b) => {
					if(a[Object.keys(a)[0]].beneficiary_name < b[Object.keys(b)[0]].beneficiary_name) { return -1; }
					if(a[Object.keys(a)[0]].beneficiary_name > b[Object.keys(b)[0]].beneficiary_name) { return 1; }
					return 0;
				})
				setTransactions(sorted)
			}else {
				//if using filtered array
				const sorted = localList.sort((a,b) => {
					if(a[Object.keys(a)[0]].beneficiary_name < b[Object.keys(b)[0]].beneficiary_name) { return -1; }
					if(a[Object.keys(a)[0]].beneficiary_name > b[Object.keys(b)[0]].beneficiary_name) { return 1; }
					return 0;
				})
				setLocalList(sorted)
			}
		}else if(value === 'date_asc'){
			if(localList === null){
				//if using array transactions
				const sorted = transactions.sort((a,b) => {
					const str_a = a[Object.keys(a)[0]].created_at
					const str_b = b[Object.keys(b)[0]].created_at
					const newStr_a = str_a.split(' ').join('T')
					const newStr_b = str_b.split(' ').join('T')
					const date_a = new Date(newStr_a)
					const date_b = new Date(newStr_b)
					if( date_a < date_b ) { return -1; }
					if( date_a > date_b ) { return 1; }
					return 0;
				})
				setTransactions(sorted)
				
			}else {
				//if using filtered array
				const sorted = localList.sort((a,b) => {
					const str_a = a[Object.keys(a)[0]].created_at
					const str_b = b[Object.keys(b)[0]].created_at
					const newStr_a = str_a.split(' ').join('T')
					const newStr_b = str_b.split(' ').join('T')
					const date_a = new Date(newStr_a)
					const date_b = new Date(newStr_b)
					if( date_a < date_b ) { return -1; }
					if( date_a > date_b ) { return 1; }
					return 0;
				})
				setLocalList(sorted)
			
			}
		}else if(value === 'name_desc'){
			if(localList === null){
				//if using array transactions
				const sorted = transactions.sort((a,b) => {
					if(a[Object.keys(a)[0]].beneficiary_name < b[Object.keys(b)[0]].beneficiary_name) { return 1; }
					if(a[Object.keys(a)[0]].beneficiary_name > b[Object.keys(b)[0]].beneficiary_name) { return -1; }
					return 0;
				})
				setTransactions(sorted)
			}else {
				//if using filtered array
				const sorted = localList.sort((a,b) => {
					if(a[Object.keys(a)[0]].beneficiary_name < b[Object.keys(b)[0]].beneficiary_name) { return 1; }
					if(a[Object.keys(a)[0]].beneficiary_name > b[Object.keys(b)[0]].beneficiary_name) { return -1; }
					return 0;
				})
				setLocalList(sorted)
			}
		}else if(value === 'date_desc'){
			if(localList === null){
				//if using array transactions
				const sorted = transactions.sort((a,b) => {
					const str_a = a[Object.keys(a)[0]].created_at
					const str_b = b[Object.keys(b)[0]].created_at
					const newStr_a = str_a.split(' ').join('T')
					const newStr_b = str_b.split(' ').join('T')
					const date_a = new Date(newStr_a)
					const date_b = new Date(newStr_b)
					if( date_a < date_b ) { return 1; }
					if( date_a > date_b ) { return -1; }
					return 0;
				})
				setTransactions(sorted)
				
			}else {
				//if using filtered array
				const sorted = localList.sort((a,b) => {
					const str_a = a[Object.keys(a)[0]].created_at
					const str_b = b[Object.keys(b)[0]].created_at
					const newStr_a = str_a.split(' ').join('T')
					const newStr_b = str_b.split(' ').join('T')
					const date_a = new Date(newStr_a)
					const date_b = new Date(newStr_b)
					if( date_a < date_b ) { return 1; }
					if( date_a > date_b ) { return -1; }
					return 0;
				})
				setLocalList(sorted)
			
			}
		}
	}

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
					<RNPickerSelect
							value={sort}
							placeholder={{}}
							onValueChange={(value) => {
								setSort(value)
								return sortTrans(value)
							}}
							style={pickerSelectStyles}
							chevronDown
							items={[
									{ label: 'URUTKAN', value: '' , color: 'salmon'},
									{ label: 'Nama A-Z', value: 'name_asc' , color: 'salmon'},
									{ label: 'Nama Z-A', value: 'name_desc', color: 'salmon' },
									{ label: 'Tanggal Terbaru', value: 'date_asc', color: 'salmon' },
									{ label: 'Tanggal Terlama', value: 'date_desc', color: 'salmon' },
							]}
					/>
				</View>
			</View>
			<FlatList 
				data={localList === null ? transactions : localList}
				renderItem={({ item }) => (
					<Card transaction={item} 
						id={Object.keys(item)[0]} 
					/>
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
		height: hp(5),
		marginTop: 10,
		backgroundColor: '#e5e5e5',
		display: "flex",
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 5
	},
	TextInput: {
		width: wp(60),
		height: hp(5),
		padding: 5,
		paddingLeft: 10
	},
	filter: {
		width: wp(25),
		height: hp(5),
		color: 'salmon',
		marginLeft: 20,
		// backgroundColor: 'red',
		display: "flex",
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	cardCont: {
		width: wp(100),
		height: hp(90),
		backgroundColor: '#e5e5e5'	
	}
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
		fontSize: 14,
		width: wp(25),
		height: hp(5),
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'salmon',
    paddingRight: 30,
  },
  inputAndroid: {
		width: wp(25),
		height: hp(5),
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
		color: 'salmon',
    paddingRight: 30, 
  },
});

export default Transaction
