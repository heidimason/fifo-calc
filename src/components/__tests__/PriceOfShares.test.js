import React from 'react'
import renderer from 'react-test-renderer'

import Root from '../../../Root'
import PriceOfShares from '../PriceOfShares'
import handlePriceChange from '../PriceOfShares'

describe('<PriceOfShares />', () => {
	const tree = renderer.create(
		<Root>
			<PriceOfShares />
		</Root>
	).toJSON()

	it('renders correctly', () => {
		expect(tree).toMatchSnapshot()
	})
})

//

describe('handlePriceChange', () => {
	it('is a function', () => {
		expect(typeof handlePriceChange).toEqual('function')
	})
})
