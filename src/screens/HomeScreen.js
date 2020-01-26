import React, { PureComponent } from 'react'
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NumShares from '../components/NumShares'
import PriceOfShares from '../components/PriceOfShares'
import TextInputError from '../components/TextInputError'
import SubmitBtn from '../components/SubmitBtn'
import { isValidChar } from '../utils/helpers'
import { blue, grayDark, green, orange, red, white } from '../utils/styles/colors'
import { btns } from '../utils/styles/btns'
import { fonts } from '../utils/styles/fonts'
import { forms } from '../utils/styles/forms'
import styled from 'styled-components/native'

class HomeScreen extends PureComponent {
	state = {
		isValidSaleNum: true,
		profit: 0,
		purchaseHistory: [],
		purchases: [],
		purchaseNum: '',
		purchasePrice: '',
		saleHistory: [],
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

	submitPurchase = () => {
		const { purchaseHistory, purchases, purchaseNum, purchasePrice } = this.state

		const purchase = {
			num: parseInt(purchaseNum),
			price: parseInt(purchasePrice)
		},

		purchaseCopy = {
			num: parseInt(purchaseNum),
			price: parseInt(purchasePrice)
		}

		this.setState({
			purchaseHistory: [purchaseCopy, ...purchaseHistory],
			purchases: [purchase, ...purchases]
		})
	}

	toHistory = () => {
        const { purchaseHistory, saleHistory } = this.state,
        						{ navigation } = this.props

        navigation.navigate('History', {
        	purchaseHistory,
        	saleHistory
        })
    }

	changeSaleShares = numShares => {
		this.setState({
			isValidSaleNum: true,
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
			profit,
			purchases,
			saleHistory,
			saleNum,
			salePrice
		} = this.state

		const salePriceInt = parseInt(salePriceParam),
		  purchasePriceInt = parseInt(purchasesParam[purchasesParam.length - 1].price)

		let saleNumInt = parseInt(saleNumParam),
		purchaseNumInt = parseInt(purchasesParam[purchasesParam.length - 1].num)

		if (saleNumInt === 0) {
			this.setState({
				profit: profitParam,
				purchases: purchasesParam,
				saleNum: ''
			})

			if (purchaseNumInt === 0) {
				purchasesParam.length--

				this.setState({
					purchaseNum: ''
				})
			}

			return
		}

		// For Sales History
		const saleCopy = {
			num: parseInt(saleNum),
			price: parseInt(salePrice)
		}

		this.setState({
			saleHistory: [saleCopy, ...saleHistory]
		})

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
			purchaseHistory: [],
			purchases: [],
			purchaseNum: '',
			purchasePrice: '',
			saleHistory: [],
			saleNum: '',
			salePrice: ''
		})
	}

	render () {
		StatusBar.setBarStyle('light-content', true)

		const {
			isValidSaleNum,
			profit,
			purchaseHistory,
			purchases,
			purchaseNum,
			purchasePrice,
			saleHistory,
			saleNum,
			salePrice
		} = this.state

		return (
			<HomeContainer>
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
							style={[btns.btnText, fonts.h3, {paddingVertical: 25}]}>History
						</HistoryText>
					}
				</HistoryBtn>

				<View>
					<Text
						style={[fonts.h2, styles.h2, styles.text]}>Sale
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
					<ProfitText
						style={[fonts.h2, styles.text]}>Profit: {profit}
					</ProfitText>
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
			</HomeContainer>
		)
	}
}

const HomeContainer = styled.View`
		background-color: ${grayDark}
		flex: 1
		justify-content: space-around
	`,
	TextContainer = styled.View`
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

export default HomeScreen