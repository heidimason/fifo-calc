import { StyleSheet } from 'react-native'
import { grayLight, grayXLight } from './colors'

export const forms = StyleSheet.create({
	iosTextInput: {
		borderRadius: 7
	},
    textInput: {
    	backgroundColor: grayLight,
        color: grayXLight,
        height: 45,
        marginHorizontal: 40,
        padding: 10,
        textAlign: 'center'
    }
})
