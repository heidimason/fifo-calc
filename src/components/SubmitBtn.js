import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { btns } from '../utils/styles/btns'
import { fonts } from '../utils/styles/fonts'

const SubmitBtn = ({ children, onPress, style = {} }) => {
  	return (
    	<TouchableOpacity
        	style={style}
        	onPress={onPress}>
        	<Text
                style={[btns.btnText, fonts.h2]}>{children}
            </Text>
    	</TouchableOpacity>
  	)
}

export default SubmitBtn