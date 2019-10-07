import { StyleSheet } from 'react-native'
import { grayLight, grayXLight, white } from './colors'

export const forms = StyleSheet.create({
    textInput: {
    	backgroundColor: white,
        color: grayXLight,
        height: 45,
        marginHorizontal: 40,
        padding: 10,
        textAlign: 'center'
    },
    textInputIOS: {
        borderRadius: 7
    }
})
