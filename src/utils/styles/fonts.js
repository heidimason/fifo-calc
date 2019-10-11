import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const fonts = StyleSheet.create({
    h1: {
        fontSize: RFPercentage(4)
    },
    h2: {
        fontSize: RFPercentage(3)
    },
    h3: {
        fontSize: RFPercentage(2)
    }
})
