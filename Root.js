import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux'

import PurchaseHistoryReducer from './src/reducers/PurchaseHistory'
import SaleHistoryReducer from './src/reducers/SaleHistory'

const rootReducer = combineReducers({
		purchaseHistory: PurchaseHistoryReducer,
		saleHistory: SaleHistoryReducer
	}),

	store = createStore(
		rootReducer
	)

export default props => {
	return (
		<Provider store={store}>
			{props.children}
		</Provider>
	)
}
