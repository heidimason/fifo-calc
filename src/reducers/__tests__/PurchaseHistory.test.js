import purchaseHistory from '../PurchaseHistory'
import {
	ADD_PURCHASE,
	REVERSE_PURCHASES
} from '../../actions/PurchaseHistory'

it('handles actions of type ADD_PURCHASE', () => {
	const action = {
		type: ADD_PURCHASE,
		payload: 'New Purchase'
	},

	newState = purchaseHistory([], action)

	expect(newState).toEqual(['New Purchase'])
})

