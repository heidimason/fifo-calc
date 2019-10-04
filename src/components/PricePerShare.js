import React from 'react'
import { Platform, TextInput, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

const PricePerShare = () => {
	return (
		<ViewTextInput>
			{ Platform.OS === 'ios' ?
				<TextInput
					placeholder="Price per Share"
		        	style={[fonts.h2, forms.iosTextInput, forms.textInput, styles.textInput]}
			        value={0}
		        />
		        :
				<TextInput
					placeholder="Price per Share"
		        	style={[fonts.h2, forms.textInput, styles.textInput]}
			        value={0}
		        />
		    }
	    </ViewTextInput>
	)
}

const ViewTextInput = styled.View`
	width: 100%
`

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 15
    }
})

export default PricePerShare