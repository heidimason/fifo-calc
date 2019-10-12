import React from 'react'
import { Text } from 'react-native'
import { orange } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import styled from 'styled-components/native'

const TextInputError = () => {
	return (
		<ErrorText
			style={fonts.h3}>Please enter a positive number only!
		</ErrorText>
	)
}

const ErrorText = styled.Text`
    color: ${orange}
    text-align: center
    margin-bottom: 15
`

export default TextInputError