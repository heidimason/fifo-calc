import React, { Component } from 'react'
import { Platform, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'
import styled from 'styled-components/native'

class NumShares extends Component {
	handleNumChange = num => {
		const { onNumChange } = this.props

		onNumChange(num)
	}

	render() {
		const { shareNum } = this.props

		return (
			<NumSharesInput
		        keyboardType="numeric"
		        onChangeText={this.handleNumChange}
				placeholder="Number of Shares"
				selectionColor={grayDark}
	        	style={[
	        		Platform.OS === 'ios'
	        		? forms.inputIOS
	        		: forms.inputAndroid,
	        		shareNum !== '' && shareNum <= 0
	        		? forms.textInputError
	        		: forms.textInputValid,
					[fonts.h2, forms.textInput]
				]}
				value={shareNum.toString()}
	        />
		)
	}
}

const NumSharesInput = styled.TextInput`
    margin-bottom: 15
`

export default NumShares