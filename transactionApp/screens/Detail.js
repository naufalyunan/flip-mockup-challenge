import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useNavigation } from '@react-navigation/native'

const Detail = (props) => {
	const data = props.route.params
	const navigation = useNavigation()

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
		<>
			<SafeAreaView style={{width: wp(100), height: hp(100), backgroundColor: '#e5e5e5'}}>
				<View style={styles.header}>
					<Text style={styles.headerText}>
						{
							`ID TRANSAKSI: #${data.id}`
						}
					</Text>
				</View>
				<View style={styles.header}>
					<Text style={styles.headerText}>
						{
							`DETAIL TRANSAKSI`
						}
					</Text>
					<TouchableOpacity 
						onPress={() => navigation.goBack()}
						style={styles.btnCont}
					>
						<Text style={{fontSize: 20, color: 'salmon', fontWeight: 'bold'}}>Tutup</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Text style={styles.bankTitle}>{data.sender_bank.toUpperCase() + ' --> ' + data.beneficiary_bank.toUpperCase()}</Text>
					<View style={styles.columnCont}>
						<View style={styles.column}>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>{data.beneficiary_name.toUpperCase()}</Text>
								<Text style={styles.sectionText}>{data.account_number}</Text>
							</View>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>BERITA TRANSFER</Text>
								<Text style={styles.sectionText}>{data.remark}</Text>
							</View>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>WAKTU DIBUAT</Text>
								<Text style={styles.sectionText}>{formattedDate(data.created_at)}</Text>
							</View>
						</View>
						<View style={styles.column}>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>NOMINAL</Text>
								<Text style={styles.sectionText}>{amountSeparator(data.amount)}</Text>
							</View>
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>KODE UNIK</Text>
								<Text style={styles.sectionText}>{data.unique_code}</Text>
							</View>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	)
}

const styles = StyleSheet.create({
	header: {
		width: wp(100),
		height: hp(8),
		display: 'flex',
		justifyContent:'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff',
		marginBottom: 2
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	btnCont: {
		width: wp(20),
		padding: 5,
		display: "flex",
		justifyContent: 'center',
		alignItems: 'center'
	},
	bankTitle: {
		marginTop: 5,
		fontSize: 20,
		fontWeight: "bold",
		padding: 20,
		paddingBottom: 0,
		backgroundColor: '#fff'
	},
	columnCont: {
		display: "flex",
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 20,
		width: wp(100),
		backgroundColor: '#fff'
	},
	column: {
		display: "flex",
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		flexDirection: 'column',
		height: '100%'
	},
	section: {
		marginTop: 10,
		marginBottom: 10
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 3
	},
	sectionText: {
		fontSize: 18
	}
})

export default Detail
