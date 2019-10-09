import React, { Component } from 'react'
import { DatePickerIOS, StyleSheet, View } from 'react-native'
import { grayDark, white } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class DPiOS extends Component {
    state = {
        chosenDate: new Date()
    }

    setDate = newDate => {
        const { onDPChange } = this.props

        onDPChange(newDate)

        this.setState({
            chosenDate: newDate
        })
    }

    render() {
        const { chosenDate } = this.state

        return (
            <View style={[styles.container, forms.inputIOS]}>
                <DatePickerIOS
                    date={chosenDate}
                    mode="date"
                    onDateChange={this.setDate}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
        backgroundColor: white,
        marginHorizontal: 40
    }
})

export default DPiOS