import {
	ADD_SALE,
	CLEAR_SALES,
	REVERSE_SALES
} from '../actions/SaleHistory'

const saleHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_SALE:
			return state.concat(action.payload)
		case CLEAR_SALES:
			return []
		case REVERSE_SALES:
			return state.reverse()
		default:
			return state
	}
}

export default saleHistory
