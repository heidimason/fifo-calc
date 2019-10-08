import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import PricePerShare from './src/components/PricePerShare'
import NumShares from './src/components/NumShares'
import DPAndroid from './src/components/DPAndroid'
import DPiOS from './src/components/DPiOS'
import SubmitBtn from './src/components/SubmitBtn'
import { grayDark, white } from './src/utils/styles/colors'
import { fonts } from './src/utils/styles/fonts'

class FifoCalculator extends Component {
    state = {
        purchasePps: 0,
        purchaseShares: 0,
        salePps: 0,
        saleShares: 0
    }

    changePurchasePps = pricePerShare => {
        this.setState({
            purchasePps: pricePerShare
        })
    }

    changePurchaseShares = numberOfShares => {
        this.setState({
            purchaseShares: numberOfShares
        })
    }

    changeSalePps = pricePerShare => {
        this.setState({
            salePps: pricePerShare
        })
    }

    changeSaleShares = numberOfShares => {
        this.setState({
            saleShares: numberOfShares
        })
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const { purchasePps, purchaseShares, salePps, saleShares } = this.state

        return (
            <View style={styles.viewContainer}>
                <TextContainer>
                    <Text
                        style={[fonts.h1, styles.text]}>FIFO Profit Calculator
                    </Text>
                </TextContainer>

                <View>
                    <Text
                        style={[fonts.h2, styles.text]}>Purchase
                    </Text>

                    <PricePerShare
                        onPriceChange={purchasePrice => {
                            this.changePurchasePps(purchasePrice)
                        }}
                    />
                    <Text style={{color: 'white'}}>{purchasePps}</Text>

                    <NumShares
                        onNumChange={purchaseNum => {
                            this.changePurchaseShares(purchaseNum)
                        }}
                    />
                    <Text style={{color: 'white'}}>{purchaseShares}</Text>
                </View>

                { Platform.OS === 'ios' ?
                    <DPiOS />
                    :
                    <DPAndroid />
                }

                <View>
                    <Text
                        style={[fonts.h2, styles.text]}>Sale
                    </Text>

                    <PricePerShare
                        onPriceChange={salePrice => {
                            this.changeSalePps(salePrice)
                        }}
                    />
                    <Text style={{color: 'white'}}>{salePps}</Text>

                    <NumShares
                        onNumChange={saleNum => {
                            this.changeSaleShares(saleNum)
                        }}
                    />
                    <Text style={{color: 'white'}}>{saleShares}</Text>
                </View>

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