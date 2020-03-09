import {
	ADD_PURCHASE,
	CLEAR_PURCHASES,
	SORT_PURCHASES
} from '../actions/PurchaseHistory'

const purchaseHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_PURCHASE:
			return state.concat(action.payload)
		case CLEAR_PURCHASES:
			return []
		case SORT_PURCHASES:
			return state.reverse()
		default:
			return state
	}
}

export default purchaseHistory
