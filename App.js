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
        profit: 0,
        purchaseDate: {},
        purchasePps: 0,
        purchaseShares: 0,
        salePps: 0,
        saleShares: 0
    }

    changeDate = dateOfPurchase => {
        this.setState({
            purchaseDate: dateOfPurchase
        })
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

    calculateProfit = () => {
        const { purchasePps, purchaseShares, salePps, saleShares } = this.state

        this.setState({
            profit: (salePps * saleShares) - (purchasePps * purchaseShares)
        })
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const { profit, purchaseDate } = this.state

        return (
            <View style={styles.viewContainer}>
                <TextContainer>
                    <Text
                        style={[fonts.h1, styles.h1, styles.text]}>FIFO Profit Calculator
                    </Text>
                </TextContainer>

                <View>
                    <Text
                        style={[fonts.h2, styles.h2, styles.text]}>Purchase
                    </Text>

                    <PricePerShare
                        onPriceChange={purchasePrice => {
                            this.changePurchasePps(purchasePrice)
                        }}
                    />

                    <NumShares
                        onNumChange={purchaseNum => {
                            this.changePurchaseShares(purchaseNum)
                        }}
                    />
                </View>

                { Platform.OS === 'ios' ?
                    <View>
                        <DPiOS
                            onDPChange={date => {
                                this.changeDate(date)
                            }}
                        />
                        <Text style={{color: 'white'}}>{purchaseDate.toString()}</Text>
                    </View>
                    :
                    <View>
                        <DPAndroid
                            onDPChange={date => {
                                this.changeDate(date)
                            }}
                        />
                        <Text style={{color: 'white'}}>{purchaseDate.toString()}</Text>
                    </View>
                }

                <View>
                    <Text
                        style={[fonts.h2, styles.h2, styles.text]}>Sale
                    </Text>

                    <PricePerShare
                        onPriceChange={salePrice => {
                            this.changeSalePps(salePrice)
                        }}
                    />

                    <NumShares
                        onNumChange={saleNum => {
                            this.changeSaleShares(saleNum)
                        }}
                    />
                </View>

                <SubmitBtn
                    onPress={this.calculateProfit}
                />

                <TextContainer>
                    <Text
                        style={[fonts.h2, styles.text, styles.profit]}>Profit: {profit}
                    </Text>
                </TextContainer>
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
        flex: 1,
        justifyContent: 'space-around'
    },
    h1: {
        marginTop: 20
    },
    h2: {
        marginBottom: 10
    },
    text: {
        color: white,
        marginHorizontal: 40
    },
    profit: {
        letterSpacing: 1,
        marginBottom: 20,
        textTransform: 'uppercase'
    }
})

export default FifoCalculator