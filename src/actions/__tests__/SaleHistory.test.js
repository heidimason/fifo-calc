import { addSale, ADD_SALE } from '../SaleHistory'

describe('addSale', () => {
	it('has the correct type', () => {
		const action = addSale()

		expect(action.type).toEqual(ADD_SALE)
	})

	it('has the correct payload', () => {
		const action = addSale('New Sale')

		expect(action.payload).toEqual('New Sale')
	})
})
