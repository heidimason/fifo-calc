import React from 'react'
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { orange, white } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'

const SubmitBtn = ({ children, onPress, style = {} }) => {
  	return (
    	<TouchableOpacity
        	style={[
                Platform.OS === 'ios'
                ? styles.submitBtnIOS
                : styles.submitBtnAndroid,
                styles.submitBtn
            ]}
        	onPress={onPress}>
        	<Text
                style={[styles.submitBtnText, fonts.h2]}>{children}Calculate
            </Text>
    	</TouchableOpacity>
  	)
}

const styles = StyleSheet.create({
    submitBtnIOS: {
        borderRadius: 7,
        marginHorizontal: 40,
        paddingVertical: 6
    },
    submitBtnAndroid: {
        alignSelf: 'center',
        borderRadius: 2,
        paddingVertical: 6,
        width: '80%'
    },
    submitBtn: {
        backgroundColor: orange,
        height: 45
    },
    submitBtnText: {
        color: white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default SubmitBtn