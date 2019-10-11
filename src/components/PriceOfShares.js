import React, { Component } from 'react'
import { Platform, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class PriceOfShares extends Component {
	handlePriceChange = price => {
		const { onPriceChange } = this.props

		onPriceChange(price)
	}

	render() {
		const { sharePrice } = this.props

		return (
			<TextInput
		        keyboardType="numeric"
				onChangeText={this.handlePriceChange}
				placeholder="Price per Share ($)"
				selectionColor={grayDark}
	        	style={[
	        		Platform.OS === 'ios'
	        		? forms.inputIOS
	        		: forms.inputAndroid,
					[fonts.h2, forms.textInput]
				]}
				value={sharePrice}
	        />
		)
	}
}

export default PriceOfShares