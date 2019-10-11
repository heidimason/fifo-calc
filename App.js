import React, { Component } from 'react'
import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import NumShares from './src/components/NumShares'
import PriceOfShares from './src/components/PriceOfShares'
import DPAndroid from './src/components/DPAndroid'
import DPiOS from './src/components/DPiOS'
import SubmitBtn from './src/components/SubmitBtn'
import { getFifoStr } from './src/utils/helpers'
import { blue, grayDark, orange, white } from './src/utils/styles/colors'
import { btns } from './src/utils/styles/btns'
import { fonts } from './src/utils/styles/fonts'
import styled from 'styled-components/native'

class FifoCalculator extends Component {
    state = {
        profit: 0,
        // purchaseDate: new Date(),
        purchases: [],
        purchaseShareNum: '',
        purchaseSharePrice: '',
        saleShareNum: '',
        saleSharePrice: ''
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
        const { purchaseDate, purchases, purchaseShareNum, purchaseSharePrice } = this.state

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
        const {
            purchases,
            purchaseShareNum,
            purchaseSharePrice,
            saleShareNum,
            saleSharePrice
        } = this.state

        const fifoItem = Object.values(purchases[0]).toString(),

              fifoPurchase = getFifoStr(fifoItem),

              saleShares = saleShareNum

        if (fifoPurchase > saleShares) {
            this.setState({
                profit: (saleSharePrice * saleShareNum) - (purchaseSharePrice * purchaseShareNum),
                purchaseShareNum: purchaseShareNum - saleShareNum
            })
        } else if (fifoPurchase === saleShares) {
            // fifoItem = Object.values(purchases)
            Alert.alert('do something!')
        } else {
            Alert.alert('Number of sale shares should not exceed purchase shares!')
        }
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const {
            profit,
            purchaseDate,
            purchases,
            purchaseShareNum,
            purchaseSharePrice,
            saleShareNum,
            saleSharePrice
        } = this.state

        return (
            <View style={styles.viewContainer}>
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

                    <PriceOfShares
                        onPriceChange={purchasePrice => {
                            this.changePurchasePrice(purchasePrice)
                        }}
                        sharePrice={purchaseSharePrice}
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
                    children="Submit"
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
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

                    <PriceOfShares
                        onPriceChange={salePrice => {
                            this.changeSalePrice(salePrice)
                        }}
                        sharePrice={saleSharePrice}
                    />
                </View>

                <SubmitBtn
                    onPress={this.calculateProfit}
                    children="Calculate"
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
                        [btns.btn, styles.submitBtnCalculate]
                    ]}
                />

                <TextContainer>
                    <ProfitText
                        style={[fonts.h2, styles.text]}>Profit: {profit}
                    </ProfitText>
                </TextContainer>
            </View>
        )
    }
}

const TextContainer = styled.View`
        align-items: center
    `,
    H1 = styled.Text`
        margin-top: 20
    `,
    ProfitText = styled.Text`
        letter-spacing: 1
        margin-bottom: 20
        text-transform: uppercase
    `

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: grayDark,
        flex: 1,
        justifyContent: 'space-around'
    },
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