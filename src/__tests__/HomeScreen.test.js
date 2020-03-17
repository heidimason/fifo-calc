import React from 'react'
import renderer from 'react-test-renderer'

import Root from '../../Root'
import HomeScreen from '../screens/HomeScreen'

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



