import React, { Component } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class PricePerShare extends Component {
	state = {
		pps: 0
	}

	handlePriceChange = price => {
		const { onPriceChange } = this.props

		onPriceChange(price)

		this.setState({price})
	}

	render() {
		const { pps } = this.state

		return (
			<View>
				{ Platform.OS === 'ios' ?
					<TextInput
				        keyboardType="numeric"
						placeholder="Price per Share"
						onChangeText={this.handlePriceChange}
						selectionColor={grayDark}
			        	style={[fonts.h2, forms.textInputIOS, forms.textInput, styles.textInput]}
				        value={pps}
			        />
			        :
					<TextInput
				        keyboardType="numeric"
				        onChangeText={this.handlePriceChange}
						placeholder="Price per Share"
						selectionColor={black}
			        	style={[fonts.h2, forms.textInput, styles.textInput]}
				        value={pps}
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