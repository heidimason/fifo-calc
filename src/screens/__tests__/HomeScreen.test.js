import React from 'react'
import renderer from 'react-test-renderer'

import Root from '../../../Root'
import HomeScreen from '../HomeScreen'
import calculateProfit from '../HomeScreen'

describe('<HomeScreen />', () => {
	const tree = renderer.create(
		<Root>
			<HomeScreen />
		</Root>
	).toJSON()

	it('renders correctly', () => {
		expect(tree).toMatchSnapshot()
	})

	it('has 1 child', () => {
		expect(tree.children.length).toBe(8)
	})
})

describe('calculateProfit', () => {
	it('is a function', () => {
		expect(typeof calculateProfit).toEqual('object')
	})

	it('calculates 1 purchase and 1 sale correctly', () => {
		const purchases = [
			{
				num: 100,
				price: 25
			}
		],

		saleNum = 80,
		salePrice = 35

		let profit = 0

		HomeScreen.calculateProfit = jest.fn( () => profit )

		const result = HomeScreen.calculateProfit(purchases, saleNum, salePrice, profit),

		expected = 800

		expect(result).toEqual(expected)
	})
})

// describe('calculateProfit function', () => {
// 	let wrapper

// 	beforeEach(() => wrapper = shallow(<HomeScreen />))

// 	test('calculates profit correctly', () => {
// 		wrapper.setState({ profit: 0 })
// 		wrapper.setState({ purchases: ['num': 100, 'price': 25] })
// 		wrapper.setState({ purchaseNum: '100' })
// 		wrapper.setState({ purchasePrice: '25' })
// 	    wrapper.setState({ saleNum: '80' })
// 	    wrapper.setState({ salePrice: '35' })
// 	    wrapper.instance().calculateProfit()
// 	    expect(wrapper.state('profit')).toEqual('800')
// 	// 	expect( calculateProfit([{num: 100, price: 25}], 80, 35, 0) ).toBe(800)
// 	})
// })

// 1. Working
// Purchases
// 	100, 25

// Sale
// 80, 35
// Answer: 800

// 2. Working
// Purchases
// 	100, 25

// Sale
// 80, 10
// Answer: -1200

// 3. Working
// Purchases
// 	100, 25
// 100, 30

// Sale
// 80, 35
// Answer: 800


// 4. Not Working
// Purchases
// 	100, 25
// 100, 30

// Sale
// 120, 35

// $10 off first 100 shares = $1000
// $5 for remaining 20 shares = $100

// Answer: $1100

// 5. Not working
// Purchases
// 	100, 25
// 100, 30
// 100, 35

// Sale
// 250, 35
// Answer:

// 1st batch - $10 gain/share at 100 shares = $1000
// 2nd - $5/share for 100 shares = $500
// 3rd - $50 shares at 35 = $0

// Answer: $1500

// Note: Profit should only go below 0 if sale price < purchase price


