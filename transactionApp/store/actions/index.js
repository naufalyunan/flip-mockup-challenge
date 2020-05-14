import axios from 'axios'

const setTransactions = (data) => {
	return {
		action: 'SET_TRANSACTIONS',
		payload: data
	}
}

export const fetchTransactions = (url) => {
	return (dispatch) =>{
		axios.get(url)
			.then(result => {
				dispatch(setTransactions(result.data))
			})
			.catch(console.log)
	}
}
