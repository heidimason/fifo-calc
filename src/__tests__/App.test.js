import React from 'react'
import renderer from 'react-test-renderer'

import FifoCalculator from '../../App'

describe('<FifoCalculator />', () => {
	const tree = renderer.create(<FifoCalculator />).toJSON()

	it('renders correctly', () => {
		expect(tree).toMatchSnapshot()
	})

	it('has 1 child', () => {
		expect(tree.children.length).toBe(2)
	})
})
