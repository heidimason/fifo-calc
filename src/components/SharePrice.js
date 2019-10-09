import React, { Component } from 'react'
import { Platform, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class SharePrice extends Component {
	state = {
		sharePrice: null
	}

	handlePriceChange = price => {
		const { onPriceChange } = this.props

		onPriceChange(price)
	}

	render() {
		const { sharePrice } = this.state

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
	        />
		)
	}
}

export default SharePrice