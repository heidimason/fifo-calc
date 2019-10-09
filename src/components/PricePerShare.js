import React, { Component } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
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
			{ Platform.OS === 'ios' ?
				<TextInput
			        keyboardType="numeric"
					onChangeText={this.handlePriceChange}
					placeholder="Price per Share ($)"
					selectionColor={grayDark}
		        	style={[fonts.h2, forms.textInput, styles.textInput, forms.inputIOS]}
		        />
		        :
				<TextInput
			        keyboardType="numeric"
			        onChangeText={this.handlePriceChange}
					placeholder="Price per Share"
					selectionColor={grayDark}
		        	style={[fonts.h2, forms.textInput, styles.textInput, forms.inputAndroid]}
		        />
		    }
		    </View>
		)
	}
}

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 15
    }
})

export default PricePerShare