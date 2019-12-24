import React, { PureComponent } from 'react'
import { FlatList, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import NumShares from './src/components/NumShares'
import PriceOfShares from './src/components/PriceOfShares'
import TextInputError from './src/components/TextInputError'
import SubmitBtn from './src/components/SubmitBtn'
import { isValidChar } from './src/utils/helpers'
import { blue, grayDark, grayXLight, orange, red, white } from './src/utils/styles/colors'
import { btns } from './src/utils/styles/btns'
import { fonts } from './src/utils/styles/fonts'
import { forms } from './src/utils/styles/forms'
import styled from 'styled-components/native'

class FifoCalculator extends PureComponent {
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

    submitPurchase = () => {
        const { purchases, purchaseNum, purchasePrice } = this.state

        const purchase = {
            num: parseInt(purchaseNum),
            price: parseInt(purchasePrice)
        }

        this.setState({
            purchases: [purchase, ...purchases]
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

    renderItem = ({ item, index }) => (
    	<ListContainer>
    		<ListText style={styles.listHistory}>
    			<Text
    				style={{fontWeight: 'bold'}}>Number of Shares
    			</Text>: {item.num}
    		</ListText>

	    	<ListText style={styles.listHistory}>
	    		<Text
	    			style={{fontWeight: 'bold'}}>Price of Shares
	    		</Text>: {item.price}
	    	</ListText>
	    </ListContainer>
    )

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
                        shareNum={purchaseNum}
                    />

                    { purchaseNum !== '' && purchaseNum === '0' || !isValidChar(purchaseNum)
                        ? <TextInputError text="Please enter a positive number only!" />
                        : null
                    }

                    <PriceOfShares
                        onPriceChange={purchasePrice => {
                            this.changePurchasePrice(purchasePrice)
                        }}
                        sharePrice={purchasePrice}
                    />

                    { purchasePrice !== '' && purchasePrice === '0' || !isValidChar(purchasePrice)
                        ? <TextInputError text="Please enter a positive number only!" />
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

                <View>
                	<Text style={[fonts.h2, styles.text]}>
	                	{ purchases.length > 0 &&
			            	<Text>Purchase History</Text>
			            }
		            </Text>

	                <HistoryContainer
	                    style={
	                    	Platform.OS === 'ios'?
	                    	forms.inputIOS :
	                    	forms.inputAndroid
	                    }>
	            		<FlatList
	            			data={purchases}
	            			renderItem={this.renderItem}
	            			keyExtractor={
	                            (purchase, index) => index.toString()
	                        }>
	                	</FlatList>
	                </HistoryContainer>
                </View>

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
                        ? <TextInputError text="Please enter a positive number only!" />
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
                        ? <TextInputError text="Please enter a positive number only!" />
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
            </AppContainer>
        )
    }
}

const AppContainer = styled.View`
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
    HistoryContainer = styled.View`
    	/* background-color: ${white} */
    	margin-horizontal: 40
    	max-height: 100
    	/* padding-vertical: 10 */
    	/* padding-horizontal: 10 */
    `,
    ListContainer = styled.View`
    	margin-vertical: 10
    	border-bottom-color: ${grayXLight}
    	border-bottom-width: 1
    	padding-bottom: 10
    `,
    ListText = styled.Text`
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
    },
    listHistory: {
    	color: white
    }
})

export default FifoCalculator
