import React from 'react'
import renderer from 'react-test-renderer'

import Root from '../../../Root'
import SubmitBtn from '../SubmitBtn'

describe('<SubmitBtn />', () => {
	const tree = renderer.create(
		<Root>
			<SubmitBtn />
		</Root>
	).toJSON()

	it('renders correctly', () => {
		expect(tree).toMatchSnapshot()
	})

	it('has 1 child', () => {
		expect(tree.children.length).toBe(1)
	})
})
