import purchaseHistoryReducer from '../PurchaseHistory'
import {
	ADD_PURCHASE,
	CLEAR_PURCHASES,
	REVERSE_PURCHASES
} from '../../actions/PurchaseHistory'

describe('Purchase History Reducer', () => {
	it('returns the initial state', () => {
		const expected = []

		expect( purchaseHistoryReducer(undefined, []) ).toEqual(expected)
	})

	it('handles actions of type ADD_PURCHASE', () => {
		const action = {
			type: ADD_PURCHASE,
			payload: 'New Purchase'
		},

		expected = ['New Purchase'],

		newState = purchaseHistoryReducer([], action)

		expect(newState).toEqual(expected)
	})

	it('handles actions of type CLEAR_PURCHASES', () => {
		const action = {
			type: CLEAR_PURCHASES
		},

		expected = [],

		initialState = {
			index: 1,
			num: 100,
			price: 25
		}

		expect( purchaseHistoryReducer(initialState, action) ).toEqual(expected)
	})

	it('handles actions of type REVERSE_PURCHASES', () => {
		const action = {
			type: REVERSE_PURCHASES
		},

		expected = [
			{
				index: 2,
				num: 100,
				price: 30
			},
			{
				index: 1,
				num: 100,
				price: 25
			}
		],

		initialState = [
			{
				index: 1,
				num: 100,
				price: 25
			},
			{
				index: 2,
				num: 100,
				price: 30
			}
		]

		expect( purchaseHistoryReducer(initialState, action) ).toEqual(expected)
	})
})
