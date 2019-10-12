import React, { Component } from 'react'
import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import NumShares from './src/components/NumShares'
import PriceOfShares from './src/components/PriceOfShares'
import TextInputError from './src/components/TextInputError'
import DPAndroid from './src/components/DPAndroid'
import DPiOS from './src/components/DPiOS'
import SubmitBtn from './src/components/SubmitBtn'
import { getFifoStr, isValidInt } from './src/utils/helpers'
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

    // changeDate = dateOfPurchase => {
    //     this.setState({
    //         purchaseDate: dateOfPurchase
    //     })
    // }

    submitPurchase = () => {
        const { purchaseDate, purchases, purchaseShareNum, purchaseSharePrice } = this.state

        const purchase = {
            // date: formatDateStr(purchaseDate),
            num: purchaseShareNum,
            price: purchaseSharePrice
        }

        this.setState({
            purchases: [...purchases, purchase]
        })

        // Alert.alert(JSON.stringify(purchases))
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

        let index = 0

        let fifoItem = Object.values(purchases[index]).toString(),

              fifoPurchase = getFifoStr(fifoItem),

              saleShares = saleShareNum

        if (fifoPurchase > saleShares) {
            this.setState({
                profit: (saleSharePrice * saleShareNum) - (purchaseSharePrice * purchaseShareNum),
                purchaseShareNum: purchaseShareNum - saleShareNum
            })
        } else if (fifoPurchase === saleShares) {
            this.setState({
                profit: (saleSharePrice * saleShareNum) - (purchaseSharePrice * purchaseShareNum),
                purchaseShareNum: purchaseShareNum - saleShareNum,
                purchases: purchases.slice(1)
            })

            // Alert.alert(purchases)
        }
        // else {
        //     Alert.alert('Number of sale shares should not exceed purchase shares!')
        // }
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const {
            profit,
            // purchaseDate,
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

                    { purchaseShareNum !== '' && purchaseShareNum <= 0 || !isValidInt(purchaseShareNum)
                        ? <TextInputError />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={purchasePrice => {
                            this.changePurchasePrice(purchasePrice)
                        }}
                        sharePrice={purchaseSharePrice}
                    />

                    { purchaseSharePrice !== '' && purchaseSharePrice <= 0 || !isValidInt(purchaseSharePrice)
                        ? <TextInputError />
                        : null
                    }
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
                    children="Submit"
                    disabled={
                        purchaseShareNum === '' || purchaseSharePrice === '' ||
                        !isValidInt(purchaseShareNum) || !isValidInt(purchaseSharePrice)
                    }
                    onPress={this.submitPurchase}
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
                        purchaseShareNum === '' || purchaseSharePrice === '' ||
                        !isValidInt(purchaseShareNum) || !isValidInt(purchaseSharePrice)
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

                    { saleShareNum !== '' && saleShareNum <= 0 || !isValidInt(saleShareNum)
                        ? <TextInputError />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={salePrice => {
                            this.changeSalePrice(salePrice)
                        }}
                        sharePrice={saleSharePrice}
                    />

                    { saleSharePrice !== '' && saleSharePrice <= 0 || !isValidInt(saleSharePrice)
                        ? <TextInputError />
                        : null
                    }
                </View>

                <SubmitBtn
                    children="Calculate"
                    disabled={
                        !purchases.length ||
                        saleShareNum === '' || saleSharePrice === '' ||
                        !isValidInt(saleShareNum) || !isValidInt(saleSharePrice)
                    }
                    onPress={this.calculateProfit}
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
                        !purchases.length ||
                        saleShareNum === '' || saleSharePrice === '' ||
                        !isValidInt(saleShareNum) || !isValidInt(saleSharePrice)
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