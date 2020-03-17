import { addPurchase, ADD_PURCHASE } from '../PurchaseHistory'

describe('addPurchase', () => {
	it('has the correct type', () => {
		const action = addPurchase()

		expect(action.type).toEqual(ADD_PURCHASE)
	})

	it('has the correct payload', () => {
		const action = addPurchase('New Purchase')

		expect(action.payload).toEqual('New Purchase')
	})
})
