import { combineReducers } from 'redux'

import transactionReducer from './transactionReducer'

const rootReducers = combineReducers({
	transactions: transactionReducer
})

export default rootReducers