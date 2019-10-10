import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import SharePrice from './src/components/SharePrice'
import NumShares from './src/components/NumShares'
import DPAndroid from './src/components/DPAndroid'
import DPiOS from './src/components/DPiOS'
import SubmitBtn from './src/components/SubmitBtn'
import { getFifoVal } from './src/utils/helpers'
import { grayDark, white } from './src/utils/styles/colors'
import { fonts } from './src/utils/styles/fonts'
import styled from 'styled-components/native'

class FifoCalculator extends Component {
    state = {
        profit: 0,
        // purchaseDate: new Date(),
        purchases: [],
        purchaseShareNum: 0,
        purchaseSharePrice: 0,
        saleShareNum: 0,
        saleSharePrice: 0
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

              fifoPurchase = getFifoVal(fifoItem),

              saleShares = saleShareNum

        if (fifoPurchase >= saleShares) {
            this.setState({
                profit: (saleSharePrice * saleShareNum) - (purchaseSharePrice * purchaseShareNum),
                purchaseShareNum: purchaseShareNum - saleShareNum
            })
        }
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const { profit, purchaseDate, purchases } = this.state

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
    }
})

export default FifoCalculator