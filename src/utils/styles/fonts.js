import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { white } from './colors'

export const fonts = StyleSheet.create({
    h1: {
        fontSize: RFPercentage(4)
    },
    h2: {
        fontSize: RFPercentage(3)
    },
    h3: {
        fontSize: RFPercentage(2)
    },
    profit: {
    	letterSpacing: 1,
		marginBottom: 30,
		textTransform: 'uppercase'
    },
    text: {
    	color: white,
		marginHorizontal: 40
    }
})
