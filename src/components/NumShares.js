import React, { Component } from 'react'
import { Platform, TextInput, View } from 'react-native'
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
			{ Platform.OS === 'ios' ?
				<TextInput
			        keyboardType="numeric"
			        onChangeText={this.handleNumChange}
					placeholder="Number of Shares"
					selectionColor={grayDark}
		        	style={[fonts.h2, forms.textInput, forms.inputIOS]}
		        />
		        :
		        <TextInput
			        keyboardType="numeric"
			        onChangeText={this.handleNumChange}
					placeholder="Number of Shares"
					selectionColor={grayDark}
		        	style={[fonts.h2, forms.textInput, forms.inputAndroid]}
		        />
		     }
		    </View>
		)
	}
}

export default NumShares