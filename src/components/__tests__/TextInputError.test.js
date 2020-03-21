import React from 'react'
import renderer from 'react-test-renderer'

import Root from '../../../Root'
import TextInputError from '../TextInputError'

describe('<TextInputError />', () => {
	const tree = renderer.create(
		<Root>
			<TextInputError />
		</Root>
	).toJSON()

	it('renders correctly', () => {
		expect(tree).toMatchSnapshot()
	})
})
