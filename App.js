import React, { Component } from 'react'
import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import NumShares from './src/components/NumShares'
import PriceOfShares from './src/components/PriceOfShares'
import TextInputError from './src/components/TextInputError'
import SubmitBtn from './src/components/SubmitBtn'
import { isValidChar } from './src/utils/helpers'
import { blue, grayDark, orange, white } from './src/utils/styles/colors'
import { btns } from './src/utils/styles/btns'
import { fonts } from './src/utils/styles/fonts'
import styled from 'styled-components/native'

class FifoCalculator extends Component {
    state = {
        profit: 0,
        purchases: [],
        purchaseShareNum: '',
        purchaseSharePrice: '',
        saleShareNum: '',
        saleSharePrice: ''
    }

    changePurchaseShares = numberOfShares => {
        this.setState({
            purchaseShareNum: numberOfShares
        })
    }

    changePurchasePrice = pricePerShare => {
        this.setState({
            purchaseSharePrice: pricePerShare
        })
    }

    submitPurchase = () => {
        const { purchases, purchaseShareNum, purchaseSharePrice } = this.state

        const purchase = {
            num: parseInt(purchaseShareNum),
            price: parseInt(purchaseSharePrice)
        }

        this.setState({
            purchases: [...purchases, purchase]
        })
    }

    changeSaleShares = numberOfShares => {
        this.setState({
            saleShareNum: numberOfShares
        })
    }

    changeSalePrice = pricePerShare => {
        this.setState({
            saleSharePrice: pricePerShare
        })
    }

    calculateProfit = () => {
        const {
            purchases,
            purchaseShareNum,
            purchaseSharePrice,
            saleShareNum,
            saleSharePrice
        } = this.state

        const purchaseShareNumInt = parseInt(purchaseShareNum),
            purchaseSharePriceInt = parseInt(purchaseSharePrice),
                  saleShareNumInt = parseInt(saleShareNum),
                saleSharePriceInt = parseInt(saleSharePrice)

        let fifoItem = purchases[0]

        if ( fifoItem.num >= saleShareNumInt ) {
            Promise.resolve(
                this.setState({
                    profit: (saleShareNumInt * saleSharePriceInt) - (fifoItem.num * fifoItem.price),
                    purchaseShareNum: '',
                    purchaseSharePrice: ''
                })
            )
            .then ( () => {
                fifoItem.num = fifoItem.num - saleShareNumInt

                // console.log(fifoItem.num)

                if (fifoItem.num === 0) {
                    this.setState({
                        purchases: purchases.slice(1)
                    })
                }
            })
        }

        // else {
        //     Alert.alert('Number of sale shares should not exceed purchase shares!')
        // }
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const {
            profit,
            purchases,
            purchaseShareNum,
            purchaseSharePrice,
            saleShareNum,
            saleSharePrice
        } = this.state

        return (
            <AppContainer>
                <TextContainer>
                    <H1
                        style={[fonts.h1, styles.text]}>FIFO Profit Calculator
                    </H1>
                </TextContainer>

                <View>
                    <Text
                        style={[fonts.h2, styles.h2, styles.text]}>Purchase
                    </Text>

                    <NumShares
                        onNumChange={purchaseNum => {
                            this.changePurchaseShares(purchaseNum)
                        }}
                        shareNum={purchaseShareNum}
                    />

                    { purchaseShareNum !== '' && purchaseShareNum === '0' || !isValidChar(purchaseShareNum)
                        ? <TextInputError />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={purchasePrice => {
                            this.changePurchasePrice(purchasePrice)
                        }}
                        sharePrice={purchaseSharePrice}
                    />

                    { purchaseSharePrice !== '' && purchaseSharePrice === '0' || !isValidChar(purchaseSharePrice)
                        ? <TextInputError />
                        : null
                    }
                </View>

                <SubmitBtn
                    children="Submit"
                    disabled={
                        purchaseShareNum === '' || purchaseSharePrice === '' ||
                        !isValidChar(purchaseShareNum) || !isValidChar(purchaseSharePrice)
                    }
                    onPress={this.submitPurchase}
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
                        purchaseShareNum === '' || purchaseSharePrice === '' ||
                        !isValidChar(purchaseShareNum) || !isValidChar(purchaseSharePrice)
                        ? btns.btnInvalid
                        : btns.btnValid,
                        [btns.btn, styles.submitBtnPurchase]
                    ]}
                />

                <Text style={{color: 'white'}}>{JSON.stringify(purchases)}</Text>

                <View>
                    <Text
                        style={[fonts.h2, styles.h2, styles.text]}>Sale
                    </Text>

                    <NumShares
                        onNumChange={saleNum => {
                            this.changeSaleShares(saleNum)
                        }}
                        shareNum={saleShareNum}
                    />

                    { saleShareNum !== '' && saleShareNum === '0' || !isValidChar(saleShareNum)
                        ? <TextInputError />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={salePrice => {
                            this.changeSalePrice(salePrice)
                        }}
                        sharePrice={saleSharePrice}
                    />

                    { saleSharePrice !== '' && saleSharePrice === '0' || !isValidChar(saleSharePrice)
                        ? <TextInputError />
                        : null
                    }
                </View>

                <SubmitBtn
                    children="Calculate"
                    disabled={
                        !purchases.length ||
                        saleShareNum === '' || saleSharePrice === '' ||
                        !isValidChar(saleShareNum) || !isValidChar(saleSharePrice)
                    }
                    onPress={this.calculateProfit}
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
                        !purchases.length ||
                        saleShareNum === '' || saleSharePrice === '' ||
                        !isValidChar(saleShareNum) || !isValidChar(saleSharePrice)
                        ? btns.btnInvalid
                        : btns.btnValid,
                        [btns.btn, styles.submitBtnCalculate]
                    ]}
                />

                <TextContainer>
                    <ProfitText
                        style={[fonts.h2, styles.text]}>Profit: {profit}
                    </ProfitText>
                </TextContainer>
            </AppContainer>
        )
    }
}

const AppContainer = styled.View`
        background-color: ${grayDark}
        flex: 1
        justifyContent: space-around
    `,
    TextContainer = styled.View`
        align-items: center
    `,
    H1 = styled.Text`
        margin-top: 30
    `,
    ProfitText = styled.Text`
        letter-spacing: 1
        margin-bottom: 30
        text-transform: uppercase
    `

const styles = StyleSheet.create({
    h2: {
        marginBottom: 10
    },
    text: {
        color: white,
        marginHorizontal: 40
    },
    submitBtnPurchase: {
        backgroundColor: blue
    },
    submitBtnCalculate: {
        backgroundColor: orange
    }
})

export default FifoCalculator
