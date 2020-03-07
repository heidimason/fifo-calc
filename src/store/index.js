import { createStore } from 'redux'
import { combineReducers } from 'redux'

import PurchaseHistoryReducer from '../reducers/PurchaseHistory'
import SaleHistoryReducer from '../reducers/SaleHistory'

const rootReducer = combineReducers({
		purchaseHistory: PurchaseHistoryReducer,
		saleHistory: SaleHistoryReducer
	}),

	store = createStore(
		rootReducer
	)

export default store
