import saleHistoryReducer from '../SaleHistory'
import {
	ADD_SALE,
	REVERSE_SALES
} from '../../actions/SaleHistory'

describe('Sale History Reducer', () => {
	it('returns the initial state', () => {
		const expected = []

		expect( saleHistoryReducer(undefined, []) ).toEqual(expected)
	})

	it('handles actions of type ADD_SALE', () => {
		const action = {
			type: ADD_SALE,
			payload: 'New SALE'
		},

		expected = ['New SALE'],

		newState = saleHistoryReducer([], action)

		expect(newState).toEqual(expected)
	})

	it('handles actions of type REVERSE_SALES', () => {
		const action = {
			type: REVERSE_SALES
		},

		expected = [
			{
				num: 20,
				price: 35
			},
			{
				num: 80,
				price: 35
			}
		],

		initialState = [
			{
				num: 80,
				price: 35
			},
			{
				num: 20,
				price: 35
			}
		]

		expect( saleHistoryReducer(initialState, action) ).toEqual(expected)
	})
})
