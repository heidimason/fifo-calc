import React from 'react'
import renderer from 'react-test-renderer'

import Root from '../../../Root'
import PriceOfShares from '../PriceOfShares'

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
