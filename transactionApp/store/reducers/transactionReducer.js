let initialState = {
	transactions: []
}

const transactionReducers = (state=initialState, action) => {
	switch (action.type) {
		case 'SET_TRANSACTIONS':
			return {
				...state,
				transactions: action.payload
			}
	
		default:
			return state
	}
}

export default transactionReducers