import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import SharePrice from './src/components/SharePrice'
import NumShares from './src/components/NumShares'
import DPAndroid from './src/components/DPAndroid'
import DPiOS from './src/components/DPiOS'
import SubmitBtn from './src/components/SubmitBtn'
import { grayDark, white } from './src/utils/styles/colors'
import { fonts } from './src/utils/styles/fonts'
// import { formatDateStr } from './src/utils/helpers'

class FifoCalculator extends Component {
    state = {
        profit: 0,
        // purchaseDate: new Date(),
        purchases: [],
        purchaseSharePrice: 0,
        purchaseShareNum: 0,
        saleSharePrice: 0,
        saleShareNum: 0
    }

    changePurchasePrice = pricePerShare => {
        this.setState({
            purchaseSharePrice: pricePerShare
        })
    }

    changePurchaseShares = numberOfShares => {
        this.setState({
            purchaseShareNum: numberOfShares
        })
    }

    // changeDate = dateOfPurchase => {
    //     this.setState({
    //         purchaseDate: dateOfPurchase
    //     })
    // }

    submitPurchase = () => {
        const { purchaseDate, purchases, purchaseSharePrice, purchaseShareNum } = this.state

        this.setState({
            purchases: purchases.concat([
                {
                    // date: formatDateStr(purchaseDate),
                    num: purchaseShareNum,
                    price: purchaseSharePrice
                }
            ])
        })
    }

    changeSalePrice = pricePerShare => {
        this.setState({
            saleSharePrice: pricePerShare
        })
    }

    changeSaleShares = numberOfShares => {
        this.setState({
            saleShareNum: numberOfShares
        })
    }

    calculateProfit = () => {
        const { purchaseSharePrice, purchaseShareNum, saleSharePrice, saleShareNum } = this.state

        this.setState({
            profit: (saleSharePrice * saleShareNum) - (purchaseSharePrice * purchaseShareNum)
        })
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const { profit, purchaseDate, purchases } = this.state

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

                    <NumShares
                        onNumChange={purchaseNum => {
                            this.changePurchaseShares(purchaseNum)
                        }}
                    />

                    <SharePrice
                        onPriceChange={purchasePrice => {
                            this.changePurchasePrice(purchasePrice)
                        }}
                    />
                </View>

                { /* Platform.OS === 'ios' ?
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
                    </View>
                */ }

                <SubmitBtn
                    onPress={this.submitPurchase}
                    children="Submit Purchase"
                />

                <Text style={{color: 'white'}}>{JSON.stringify(purchases)}</Text>

                { /* purchases.length &&
                    <View>
                        <View>
                            <Text
                                style={[fonts.h2, styles.h2, styles.text]}>Sale
                            </Text>

                            <NumShares
                                onNumChange={saleNum => {
                                    this.changeSaleShares(saleNum)
                                }}
                            />

                            <SharePrice
                                onPriceChange={salePrice => {
                                    this.changeSalePrice(salePrice)
                                }}
                            />
                        </View>

                        <SubmitBtn
                            onPress={this.calculateProfit}
                            children="Calculate"
                        />

                        <TextContainer>
                            <Text
                                style={[fonts.h2, styles.text, styles.profit]}>Profit: {profit}
                            </Text>
                        </TextContainer>
                    </View>
                */ }
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