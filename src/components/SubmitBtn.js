import React from 'react'
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { orange, white } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'

function SubmitBtn ({ children, onPress, style = {} }) {
  	return (
    	<TouchableOpacity
        	style={[
                Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn,
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
    iosSubmitBtn: {
        borderRadius: 7,
        height: 45,
        marginHorizontal: 40,
        paddingVertical: 6
    },
    AndroidSubmitBtn: {
        borderRadius: 2,
        height: 45,
        marginRight: 15,
        paddingVertical: 6,
        alignSelf: 'flex-end',
        width: '65%'
    },
    submitBtn: {
        backgroundColor: orange
    },
    submitBtnText: {
        color: white,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default SubmitBtn