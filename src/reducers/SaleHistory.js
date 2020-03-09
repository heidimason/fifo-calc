import {
	ADD_SALE,
	SORT_SALES
} from '../actions/SaleHistory'

const saleHistory = (state = [], action) => {
	switch (action.type) {
		case ADD_SALE:
			return state.concat(action.payload)
		case SORT_SALES:
			return state.reverse()
		default:
			return state
	}
}

export default saleHistory
