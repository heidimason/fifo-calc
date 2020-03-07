import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
// import serializeForm from 'form-serialize'

import NumShares from '../components/NumShares'
import PriceOfShares from '../components/PriceOfShares'
import TextInputError from '../components/TextInputError'
import SubmitBtn from '../components/SubmitBtn'
import { isValidChar } from '../utils/helpers'
import { blue, grayDark, green, orange, red, white } from '../utils/styles/colors'
import { app } from '../utils/styles/app'
import { btns } from '../utils/styles/btns'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'
import { addPurchase } from '../actions/PurchaseHistory'
import { addSale } from '../actions/SaleHistory'

class HomeScreen extends Component {
	state = {
		isValidSaleNum: true,
		profit: 0,
		purchases: [],
		purchaseNum: '',
		purchasePrice: '',
		saleNum: '',
		salePrice: ''
	}

	changePurchaseShares = numShares => {
		this.setState({
			purchaseNum: numShares
		})
	}

	changePurchasePrice = pricePerShare => {
		this.setState({
			purchasePrice: pricePerShare
		})
	}

	submitPurchase = e => {
		// e.preventDefault()

		// const values = serializeForm(e.target, { hash: true })

		const { purchases, purchaseNum, purchasePrice } = this.state,
			 { purchaseHistory, updatePurchaseHistory } = this.props

		const purchase = {
			num: parseInt(purchaseNum),
			price: parseInt(purchasePrice)
		}

		// const purchaseCopy = Object.assign(values, {
		// 	index: parseInt(purchaseHistory.length + 1),
		// 	num: parseInt(purchaseNum),
		// 	price: parseInt(purchasePrice)
		// })

		const purchaseCopy = JSON.parse( JSON.stringify(purchase) )

		this.setState({
			purchases: [purchase, ...purchases]
		})

		updatePurchaseHistory(purchaseCopy)
	}

	toHistory = () => {
        const { profit } = this.state,
		  { navigation } = this.props

        navigation.navigate('History', {
        	profit
        })
    }

	changeSaleShares = numShares => {
		this.setState({
			saleNum: numShares
		})
	}

	changeSalePrice = pricePerShare => {
		this.setState({
			salePrice: pricePerShare
		})
	}

	calculateProfit = (purchasesParam, saleNumParam, salePriceParam, profitParam = 0 || this.state.profit) => {
		const {
			isValidSaleNum,
			profit,
			purchases,
			saleNum,
			salePrice
		} = this.state

		const { saleHistory } = this.props

		const salePriceInt = parseInt(salePriceParam),
		  purchasePriceInt = parseInt(purchasesParam[purchasesParam.length - 1].price)

		let saleNumInt = parseInt(saleNumParam),
		purchaseNumInt = parseInt(purchasesParam[purchasesParam.length - 1].num)

		// Base case
		if (saleNumInt === 0) {
			// For Sales History
			const saleCopy = {
				index: parseInt(saleHistory.length + 1),
				num: parseInt(saleNum),
				price: parseInt(salePrice)
			}

			this.setState({
				isValidSaleNum: true,
				profit: profitParam,
				purchases: purchasesParam,
				saleHistory: [saleCopy, ...saleHistory]
			})

			if (purchaseNumInt === 0) {
				purchasesParam.length--
			}

			return
		}

		// Recursively calculate profit
		if (saleNumInt <= purchaseNumInt) {
			profitParam += (saleNumInt * salePriceInt) - (saleNumInt * purchasePriceInt)

			purchasesParam[purchasesParam.length - 1].num -= saleNumInt

			saleNumParam -= saleNumInt

			return this.calculateProfit(purchasesParam, saleNumParam, salePriceParam, profitParam)
		} else {
			// Calculate batch by batch
			if (purchasesParam.length > 1) {
				profitParam += (purchaseNumInt * salePriceInt) - (purchaseNumInt * purchasePriceInt)

				purchasesParam[purchasesParam.length - 1].num -= purchaseNumInt

				saleNumParam -= purchaseNumInt

				if (purchasesParam[purchasesParam.length - 1].num === 0) {
					purchasesParam.length--
				}

				return this.calculateProfit(purchasesParam, saleNumParam, salePriceParam, profitParam)
			} else {
				// Display error text (i.e. "Number of sale shares must not exceed number of purchase shares!")
				this.setState({
					isValidSaleNum: false
				})
			}
		}
	}

	resetAll = () => {
		this.setState({
			isValidSaleNum: true,
			profit: 0,
			purchases: [],
			purchaseNum: '',
			purchasePrice: '',
			saleNum: '',
			salePrice: ''
		})
	}

	render () {
		StatusBar.setBarStyle('light-content', true)

		const {
			isValidSaleNum,
			profit,
			purchases,
			purchaseNum,
			purchasePrice,
			saleNum,
			salePrice
		} = this.state,

		{ purchaseHistory } = this.props

		return (
			<View style={app.container}>
				<TextContainer>
					<H1
						style={[fonts.h1, fonts.text]}>FIFO Profit Calculator
					</H1>
				</TextContainer>

				<View>
					<Text
						style={[fonts.h2, fonts.text, styles.h2]}>Purchase
					</Text>

					<NumShares
						onNumChange={purchaseNum => {
							this.changePurchaseShares(purchaseNum)
						}}
						shareNum={purchaseNum}
					/>

					{ purchaseNum !== '' && purchaseNum === '0' || !isValidChar(purchaseNum)
						? <TextInputError text="Please enter a positive integer only!" />
						: null
					}

					<PriceOfShares
						onPriceChange={purchasePrice => {
							this.changePurchasePrice(purchasePrice)
						}}
						sharePrice={purchasePrice}
					/>

					{ purchasePrice !== '' && purchasePrice === '0' || !isValidChar(purchasePrice)
						? <TextInputError text="Please enter a positive integer only!" />
						: null
					}
				</View>

				<SubmitBtn
					children="Submit"
					disabled={
						purchaseNum === '' || purchasePrice === '' ||
						!isValidChar(purchaseNum) || !isValidChar(purchasePrice)
					}
					onPress={this.submitPurchase}
					style={[
						Platform.OS === 'ios'
						? btns.btnIOS
						: btns.btnAndroid,
						purchaseNum === '' || purchasePrice === '' ||
						!isValidChar(purchaseNum) || !isValidChar(purchasePrice)
						? btns.btnInvalid
						: btns.btnValid,
						[btns.btn, styles.submitBtnPurchase]
					]}
				/>

				<HistoryBtn
					disabled={!purchaseHistory.length}
					onPress={this.toHistory}
					style={[
						!purchaseHistory.length
						? btns.btnInvalid
						: btns.btnValid,
						btns.btn
					]}>
					{ Platform.OS === 'ios' ?
						<HistoryText
							style={[btns.btnText, fonts.h3, {position: 'absolute'}]}>History
						</HistoryText>
						:
						<HistoryText
							style={[btns.btnText, fonts.h3]}>History
						</HistoryText>
					}
				</HistoryBtn>

				<View>
					<Text
						style={[fonts.h2, fonts.text, styles.h2]}>Sale
					</Text>

					<NumShares
						onNumChange={saleNum => {
							this.changeSaleShares(saleNum)
						}}
						shareNum={saleNum}
					/>

					{ saleNum !== '' && saleNum === '0' || !isValidChar(saleNum)
						? <TextInputError text="Please enter a positive integer only!" />
						: null
					}

					{ !isValidSaleNum
						? <TextInputError text="Number of sale shares must not exceed number of purchase shares!" />
						: null
					}

					<PriceOfShares
						onPriceChange={salePrice => {
							this.changeSalePrice(salePrice)
						}}
						sharePrice={salePrice}
					/>

					{ salePrice !== '' && salePrice === '0' || !isValidChar(salePrice)
						? <TextInputError text="Please enter a positive integer only!" />
						: null
					}
				</View>

				<SubmitBtn
					children="Calculate"
					disabled={
						!purchases.length ||
						saleNum === '' || salePrice === '' ||
						!isValidChar(saleNum) || !isValidChar(salePrice)
					}
					onPress={() => this.calculateProfit(purchases, saleNum, salePrice)}
					style={[
						Platform.OS === 'ios'
						? btns.btnIOS
						: btns.btnAndroid,
						!purchases.length ||
						saleNum === '' || salePrice === '' ||
						!isValidChar(saleNum) || !isValidChar(salePrice)
						? btns.btnInvalid
						: btns.btnValid,
						[btns.btn, styles.submitBtnCalculate]
					]}
				/>

				<TextContainer>
					<Text
						style={[fonts.h2, fonts.profit, fonts.text]}>Profit: {profit}
					</Text>
				</TextContainer>

				<SubmitBtn
					children="Reset All"
					disabled={
						!purchases.length &&
						purchaseNum === '' && saleNum === '' &&
						purchasePrice === '' && salePrice === ''}
					onPress={this.resetAll}
					style={[
						Platform.OS === 'ios'
						? btns.btnIOS
						: btns.btnAndroid,
						!purchases.length &&
						purchaseNum === '' && saleNum === '' &&
						purchasePrice === '' && salePrice === ''
						? btns.btnInvalid
						: btns.btnValid,
						[btns.btn, styles.submitBtnReset]
					]}
				/>
			</View>
		)
	}
}

const TextContainer = styled.View`
		align-items: center
	`,
	H1 = styled.Text`
		margin-top: 30
	`,
	HistoryBtn = styled.TouchableOpacity`
		align-self: flex-end
		top: 10
		transform: rotate(270deg)
	`,
	HistoryText = styled.Text`
		align-self: center
		background-color: ${green}
		letter-spacing: 3
		paddingHorizontal: 3
		text-transform: uppercase
		top: 3
	`

const styles = StyleSheet.create({
	h2: {
		marginBottom: 10
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

const mapStateToProps = state => {
    return {
        purchaseHistory: state.purchaseHistory,
        saleHistory: state.saleHistory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePurchaseHistory: purchase => dispatch( addPurchase(purchase) ),
        updateSaleHistory: sale => dispatch( addSale(sale) )
    }
}

export default withNavigation( connect(mapStateToProps, mapDispatchToProps)(HomeScreen) )
