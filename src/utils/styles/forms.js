import { StyleSheet } from 'react-native'
import { grayLight, grayXLight, white } from './colors'

export const forms = StyleSheet.create({
    inputAndroid: {
        borderRadius: 2
    },
    inputIOS: {
        borderRadius: 7
    },
    textInput: {
    	backgroundColor: white,
        color: grayXLight,
        height: 45,
        marginHorizontal: 40,
        padding: 10,
        textAlign: 'center'
    }
})
