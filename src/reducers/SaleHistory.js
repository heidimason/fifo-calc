import {
	ADD_SALE,
	CLEAR_SALES,
	REVERSE_SALES
} from '../actions/SaleHistory'

const saleHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_SALE:
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
		case CLEAR_SALES:
			return []
		case REVERSE_SALES:
			return state.reverse()
		default:
			return state
	}
}

export default saleHistory
