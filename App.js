import React, { Component } from 'react'
import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import NumShares from './src/components/NumShares'
import PriceOfShares from './src/components/PriceOfShares'
import TextInputError from './src/components/TextInputError'
import SubmitBtn from './src/components/SubmitBtn'
import { isValidChar } from './src/utils/helpers'
import { blue, grayDark, orange, red, white } from './src/utils/styles/colors'
import { btns } from './src/utils/styles/btns'
import { fonts } from './src/utils/styles/fonts'
import styled from 'styled-components/native'

class FifoCalculator extends Component {
    state = {
        isValidSaleShareNum: true,
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
            isValidSaleShareNum: true,
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
        	profit,
            purchases,
            saleShareNum,
            saleSharePrice
        } = this.state

        const saleShareNumInt = parseInt(saleShareNum),
        	saleSharePriceInt = parseInt(saleSharePrice)

		let firstItem = purchases[0]

		if (firstItem.num >= saleShareNumInt) {
	        this.setState({
	        	profit: profit + (saleShareNumInt * saleSharePriceInt) - (saleShareNumInt * firstItem.price)
	        })

			// Recalculate first number of purchase shares
	        firstItem.num -= saleShareNumInt

            // Slice off first item
            if (firstItem.num === 0) {
                this.setState({
                    purchases: purchases.slice(1)
                })
            }
		} else {
        	// Get sum of number of purchase shares
			let totalPurchaseNums = purchases.reduce ( (accumulator, currentVal) => {
				accumulator += currentVal.num

				return accumulator
			}, 0)

			if (totalPurchaseNums < saleShareNumInt) {
				// Display error text (i.e. "Number of sale shares must not exceed number of purchase shares!")
	        	this.setState({
		        	isValidSaleShareNum: false
	        	})
			} else {
				let originalPurchaseNum = firstItem.num

		        this.setState({
		        	profit: profit + ( firstItem.num * (saleSharePriceInt - firstItem.price) ),
		        	purchases: purchases.slice(1)
		        })

				if (purchases.length > 1) {
			        // Reassign first number of purchase shares
			        firstItem = purchases[1]

			        console.log(firstItem)
				}

		        firstItem.num += originalPurchaseNum - saleShareNumInt

		        originalPurchaseNum = firstItem.num
			}
		}
    }

    resetAll = () => {
    	this.setState({
	    	isValidSaleShareNum: true,
	        profit: 0,
	        purchases: [],
	        purchaseShareNum: '',
	        purchaseSharePrice: '',
	        saleShareNum: '',
	        saleSharePrice: ''
    	})
    }

    render () {
        StatusBar.setBarStyle('light-content', true)

        const {
            isValidSaleShareNum,
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
                        ? <TextInputError text="Please enter a positive number only!" />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={purchasePrice => {
                            this.changePurchasePrice(purchasePrice)
                        }}
                        sharePrice={purchaseSharePrice}
                    />

                    { purchaseSharePrice !== '' && purchaseSharePrice === '0' || !isValidChar(purchaseSharePrice)
                        ? <TextInputError text="Please enter a positive number only!" />
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
                        ? <TextInputError text="Please enter a positive number only!" />
                        : null
                    }

                    { !isValidSaleShareNum
                        ? <TextInputError text="Number of sale shares must not exceed number of purchase shares!" />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={salePrice => {
                            this.changeSalePrice(salePrice)
                        }}
                        sharePrice={saleSharePrice}
                    />

                    { saleSharePrice !== '' && saleSharePrice === '0' || !isValidChar(saleSharePrice)
                        ? <TextInputError text="Please enter a positive number only!" />
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

                <SubmitBtn
                    children="Reset All"
                    disabled={!purchases.length}
                    onPress={this.resetAll}
                    style={[
                        Platform.OS === 'ios'
                        ? btns.btnIOS
                        : btns.btnAndroid,
                        !purchases.length
                        ? btns.btnInvalid
                        : btns.btnValid,
                        [btns.btn, styles.submitBtnReset]
                    ]}
                />
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
    },
    submitBtnReset: {
    	backgroundColor: red,
        marginBottom: 30
    }
})

export default FifoCalculator
