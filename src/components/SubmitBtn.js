import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { btns } from '../utils/styles/btns'
import { fonts } from '../utils/styles/fonts'

const SubmitBtn = ({ children, disabled, onPress, style = {} }) => {
  	return (
    	<TouchableOpacity
    		disabled={disabled}
        	onPress={onPress}
        	style={[style, btns.btnContainer]}>
        	<Text
                style={[btns.btnText, fonts.h2]}>{children}
            </Text>
    	</TouchableOpacity>
  	)
}

export default SubmitBtn
