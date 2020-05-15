import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Card = (props) => {
	const { transaction, id } = props
	
	const amountSeparator = (amount) => {
		const amountStr = amount.toString()
		const amountArr = amountStr.split('')
		let count = 0;
		let newArr = []
		for(let i = amountArr.length - 1; i >= 0; i--){
			newArr.push(amountArr[i])
			count++
			if(count === 3 && i !== 0) {
				count = 0
				newArr.push('.')
			}
		}
		const separated = newArr.reverse()
		return 'Rp' + separated.join('')
	}

	const formattedDate = (dateStr) => {
		const newStr = dateStr.split(' ').join('T')
		const date = new Date(newStr)
		const year = date.getFullYear()
		const monthName = [
			'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
		]
		const month = date.getMonth()
		const day = date.getDate()
		const formattedDate = `${day} ${monthName[month]} ${year}`
		return formattedDate
	}

	return (
		<TouchableOpacity style={transaction[id].status === 'SUCCESS'? [styles.container, styles.successContainer] : [styles.container, styles.checkContainer]}>
			<View>
				<Text style={styles.bankName}>{transaction[id].sender_bank + ' --> ' + transaction[id].beneficiary_bank}</Text>
				<Text style={styles.userName}>{transaction[id].beneficiary_name}</Text>
				<Text style={styles.transData}>{amountSeparator(transaction[id].amount) + ' . ' + formattedDate(transaction[id].completed_at)}</Text>
			</View>
			<View>
				<View style={transaction[id].status === 'SUCCESS'? styles.statusSuccess : styles.statusCheck}>
					<Text style={transaction[id].status === 'SUCCESS'? styles.textSuccess : styles.textCheck}>{transaction[id].status === 'SUCCESS'? 'Berhasil' : 'Pengecekan'}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: wp(90),
		// height: hp(20),
		padding: 20,
		backgroundColor: '#fff',
		margin: 10,
		borderRadius: 10,
		display: "flex",
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	successContainer: {
		borderLeftWidth: 5,
		borderLeftColor: 'green'
	},
	checkContainer: {
		borderLeftWidth: 5,
		borderLeftColor: 'red'
	},
	bankName: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 5
	},
	userName :{ 
		fontSize: 25,
		marginTop: 5,
		marginBottom: 5
	},
	transData: {
		fontSize: 15,
		marginTop: 5,
		// marginBottom: 5
	},
	textCheck: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000'
	},
	textSuccess: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff'
	},
	statusCheck: {
		backgroundColor: '#fff',
		borderColor: 'red',
		borderRadius: 5,
		borderWidth: 1,
		padding: 5
	},
	statusSuccess: {
		backgroundColor: 'green',
		padding: 5,
		borderRadius: 5	,
		padding: 5
	}
})

export default Card
