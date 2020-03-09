import {
	ADD_PURCHASE,
	CLEAR_PURCHASES,
	REVERSE_PURCHASES
} from '../actions/PurchaseHistory'

const purchaseHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_PURCHASE:
			return state.concat(action.payload)
		case CLEAR_PURCHASES:
			return []
		case REVERSE_PURCHASES:
			return state.reverse()
		default:
			return state
	}
}

export default purchaseHistory
