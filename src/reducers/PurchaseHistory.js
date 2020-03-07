import {
	ADD_PURCHASE,
	SORT_PURCHASES
} from '../actions/PurchaseHistory'

const purchaseHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_PURCHASE:
			return [
				{...state, ...action.purchase}
			]
		case SORT_PURCHASES:
			return state.reverse()
		default:
			return state
	}
}

export default purchaseHistory
