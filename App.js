import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import PricePerShare from './src/components/PricePerShare'
import NumShares from './src/components/NumShares'
import DPiOS from './src/components/DPiOS'
import SubmitBtn from './src/components/SubmitBtn'
import { grayDark, white } from './src/utils/styles/colors'
import { fonts } from './src/utils/styles/fonts'

class FifoCalculator extends Component {
    state = {
        gainPps: 0,
        lossPps: 0
    }

    changeGainPrice = pricePerShare => {
        this.setState({
            gainPps: pricePerShare
        })
    }

    changeLossPrice = pricePerShare => {
        this.setState({
            lossPps: pricePerShare
        })
    }

    render () {
        const { gainPps, lossPps } = this.state

        return (
            <View style={styles.viewContainer}>
                <TextContainer>
                    <Text
                        style={[fonts.h1, styles.text]}>FIFO Profit Calculator
                    </Text>
                </TextContainer>

                <Text
                    style={[fonts.h2, styles.text]}>Loss
                </Text>
                <PricePerShare
                    onPriceChange={lossPrice => {
                        this.changeLossPrice(lossPrice)
                    }}
                />
                <Text style={{color: 'white'}}>{this.state.lossPps}</Text>
                <NumShares />
                <DPiOS />

                <Text
                    style={[fonts.h2, styles.text]}>Gain
                </Text>
                <PricePerShare
                    onPriceChange={gainPrice => {
                        this.changeGainPrice(gainPrice)
                    }}
                />
                <Text style={{color: 'white'}}>{this.state.gainPps}</Text>
                <NumShares />

                <SubmitBtn />

                <Text
                    style={[fonts.h2, styles.text]}>Profit: {}
                </Text>
            </View>
        )
    }
}

const TextContainer = styled.View`
    align-items: center
`

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: grayDark,
        flex: 1
    },
    text: {
        color: white,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 40
    }
})

export default FifoCalculator