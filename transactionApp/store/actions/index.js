import axios from 'axios'

export const setTransactions = (data) => {
	return {
		type: 'SET_TRANSACTIONS',
		payload: data
	}
}

export const fetchTransactions = (url) => {
	return (dispatch) =>{
		axios.get(url)
			.then(result => {
				let newArr = []
				for(let key in result.data){
					newArr.push({
						[key]: result.data[key]
					})
				}
				dispatch(setTransactions(newArr))
			})
			.catch(console.log)
	}
}
