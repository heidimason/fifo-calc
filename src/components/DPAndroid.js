import React, { Component } from 'react'
import { DatePickerAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { blue, white } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class DPAndroid extends Component {
    openDatePicker() {
        try {
            const {action, year, month, day} = DatePickerAndroid.open({
                // Use `new Date()` for current date.
                date: new Date()
                // May 25 2020. Month 0 is January.
                // date: new Date(2020, 4, 25)
            })

            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message)
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.openDatePicker()}>
                <Text style={[fonts.h2, forms.inputAndroid, styles.text]}>Select Date</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: blue,
        color: white,
        height: 45,
        marginHorizontal: 40,
        paddingTop: 7,
        paddingBottom: 13,
        textAlign: 'center'
    }
})

export default DPAndroid