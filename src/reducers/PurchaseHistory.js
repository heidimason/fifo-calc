import {
	ADD_PURCHASE,
	CLEAR_PURCHASES,
	REVERSE_PURCHASES
} from '../actions/PurchaseHistory'

const purchaseHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_PURCHASE:
			if (state === []) {
				// Add payload object to end of array
				return state.concat(action.payload)
			} else {
				if (state[0] === undefined || state[0].index === 1) {
					// Add payload object to end of array
					return state.concat(action.payload)
				} else {
				 	// Add payload object to beginning of array
					state.unshift(action.payload)

					return state
				}
			}
		case CLEAR_PURCHASES:
			return []
		case REVERSE_PURCHASES:
			return state.reverse()
		default:
			return state
	}
}

export default purchaseHistory
