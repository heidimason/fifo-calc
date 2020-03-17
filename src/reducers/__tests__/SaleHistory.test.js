import saleHistory from '../SaleHistory'
import {
	ADD_SALE,
	REVERSE_SALES
} from '../../actions/SaleHistory'

it('handles actions of type ADD_SALE', () => {
	const action = {
		type: ADD_SALE,
		payload: 'New Sale'
	},

	newState = saleHistory([], action)

	expect(newState).toEqual(['New Sale'])
})
