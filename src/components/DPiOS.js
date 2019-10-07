import React, { Component } from 'react'
import { DatePickerIOS, StyleSheet, View } from 'react-native'
import { grayDark, white } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'

class DPiOS extends Component {
    constructor(props) {
        super(props)
        this.state = {chosenDate: new Date()}

        this.setDate = this.setDate.bind(this)
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate})
    }

    render() {
        return (
            <View style={[styles.container, forms.textInputIOS]}>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
        backgroundColor: white,
        marginTop: 40,
        marginHorizontal: 40
    }
})

export default DPiOS