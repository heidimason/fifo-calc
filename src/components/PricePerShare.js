import React, { Component } from 'react'
import { Platform, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class PricePerShare extends Component {
	state = {
		pps: null
	}

	handlePriceChange = price => {
		const { onPriceChange } = this.props

		onPriceChange(price)
	}

	render() {
		const { pps } = this.state

		return (
			<View>
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
		    </View>
		)
	}
}

export default PricePerShare