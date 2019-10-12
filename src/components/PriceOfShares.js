import React from 'react'
import { Platform, TextInput, View } from 'react-native'
import { grayDark } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'
import styled from 'styled-components/native'

const PriceOfShares = props => {
	const { sharePrice } = props

	handlePriceChange = price => {
		const { onPriceChange } = props

		onPriceChange(price)
	}

	return (
		<PriceOfSharesInput
	        keyboardType="numeric"
			onChangeText={this.handlePriceChange}
			placeholder="Price per Share"
			selectionColor={grayDark}
        	style={[
        		Platform.OS === 'ios'
        		? forms.inputIOS
        		: forms.inputAndroid,
        		sharePrice !== '' && sharePrice <= 0
        		? forms.textInputError
        		: forms.textInputValid,
				[fonts.h2, forms.textInput]
			]}
			value={sharePrice}
        />
	)
}

const PriceOfSharesInput = styled.TextInput`
    margin-bottom: 15
`

export default PriceOfShares