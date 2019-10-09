import React, { Component } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class NumShares extends Component {
	state = {
		numShares: null
	}

	handleNumChange = num => {
		const { onNumChange } = this.props

		onNumChange(num)
	}

	render() {
		const { numShares } = this.state

		return (
			<View>
				<TextInput
			        keyboardType="numeric"
			        onChangeText={this.handleNumChange}
					placeholder="Number of Shares"
					selectionColor={grayDark}
		        	style={[
		        		Platform.OS === 'ios'
		        		? forms.inputIOS
		        		: forms.inputAndroid,
						[fonts.h2, forms.textInput, styles.textInput]
					]}
		        />
		    </View>
		)
	}
}

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 15
    }
})

export default NumShares