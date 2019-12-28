import { StyleSheet } from 'react-native'
import { white } from './colors'

export const btns = StyleSheet.create({
    btn: {
        height: 45
    },
    btnInvalid: {
        opacity: 0.3
    },
    btnValid: {
        opacity: 1
    },
    btnAndroid: {
        alignSelf: 'center',
        borderRadius: 2,
        width: '83%'
    },
    btnIOS: {
        borderRadius: 7,
        marginHorizontal: 40
    },
    btnContainer: {
    	justifyContent: 'center'
    },
    btnText: {
        color: white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
