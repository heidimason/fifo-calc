import React, { Component } from 'react'
import { FlatList, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { grayDark, grayXLight, white } from '../utils/styles/colors'
import { app } from '../utils/styles/app'
import { fonts } from '../utils/styles/fonts'
import { reversePurchases } from '../actions/PurchaseHistory'
import { reverseSales } from '../actions/SaleHistory'

class HistoryScreen extends Component {
	state = {
		sortPurchasesAsc: true,
		sortSalesAsc: true
	}

	toHome = () => {
        const { navigation } = this.props

        navigation.navigate('Home')
    }

    sortPurchases = () => {
    	const { sortPurchaseHistory } = this.props

    	sortPurchaseHistory()

		this.setState(prevState => ({
			sortPurchasesAsc: !prevState.sortPurchasesAsc
		}))
    }

    sortSales = () => {
    	const { sortSaleHistory } = this.props

    	sortSaleHistory()

		this.setState(prevState => ({
			sortSalesAsc: !prevState.sortSalesAsc
		}))
    }

	renderItem = ({ item, index }) => (
		<FlatListView>
			<HistoryText>
				<SharesText>{item.index}.</SharesText>
			</HistoryText>

			<HistoryText>Number of Shares: <SharesText>{item.num}</SharesText></HistoryText>

			<HistoryText>Price of Shares: <SharesText>{item.price}</SharesText></HistoryText>
		</FlatListView>
	)

	render () {
		const { sortPurchasesAsc, sortSalesAsc } = this.state,
				{ purchaseHistory, saleHistory } = this.props,
									  { profit } = this.props.navigation.state.params

		return (
	        <View style={app.container}>
				<BackBtn onPress={this.toHome}>
					{ Platform.OS === 'ios' ?
						<InlineView>
							<Ionicons
								color={white}
				                name='ios-arrow-back'
				                size={RFPercentage(5)}
							/>

							<Text
								style={[fonts.h1, fonts.text]}>History
							</Text>
						</InlineView>
						:
						<InlineView>
						    <Ionicons
				                color={white}
				                name='md-arrow-round-back'
				                size={RFPercentage(5)}
				    		/>

							<Text
								style={[fonts.h1, fonts.text]}>History
							</Text>
						</InlineView>
		    		}
				</BackBtn>

	            <HistoryView>
	            	<InlineView>
		        		<HistoryText style={[fonts.h2, styles.h2]}>Purchases</HistoryText>

		        		{ purchaseHistory.length > 1 &&
			        		<TouchableOpacity
			        			onPress={this.sortPurchases}>
				        		{ sortPurchasesAsc ?
					        		<MaterialCommunityIcons
										color={white}
						                name='sort'
						                size={RFPercentage(4)}
						                style={styles.sort}
									/>
									:
					        		<MaterialCommunityIcons
										color={white}
						                name='sort'
						                size={RFPercentage(4)}
						                style={styles.sort}
									/>
								}
							</TouchableOpacity>
						}
					</InlineView>

	        		<FlatList
	        			data={purchaseHistory}
	        			renderItem={this.renderItem}
	        			keyExtractor={
	                        (purchase, index) => index.toString()
	                    }>
	            	</FlatList>
	        	</HistoryView>

	        	<HistoryView>
		        	{ saleHistory.length > 0 &&
		        		<View>
		        			<InlineView>
				            	<HistoryText style={[fonts.h2, styles.h2]}>Sales</HistoryText>

				            	{ saleHistory.length > 1 &&
									<TouchableOpacity
				        				onPress={this.sortSales}>
				        				{ sortSalesAsc ?
							        		<MaterialCommunityIcons
												color={white}
								                name='sort'
								                size={RFPercentage(4)}
								                style={styles.sort}
											/>
											:
							        		<MaterialCommunityIcons
												color={white}
								                name='sort'
								                size={RFPercentage(4)}
								                style={styles.sort}
											/>
										}
									</TouchableOpacity>
								}
							</InlineView>

			            	<FlatList
			        			data={saleHistory}
			        			renderItem={this.renderItem}
			        			keyExtractor={
			                        (sale, index) => index.toString()
			                    }>
			            	</FlatList>
		            	</View>
	            	}
	        	</HistoryView>

				<TextContainer>
					<Text
						style={[fonts.h2, fonts.profit, fonts.text]}>Profit: {profit}
					</Text>
				</TextContainer>
	        </View>
		)
	}
}

const BackBtn = styled.TouchableOpacity`
		align-items: center
	`,
	InlineView = styled.View`
        flex-direction: row
	`,
	HistoryView = styled.View`
		margin-horizontal: 40
		max-height: 30%
	`,
	HistoryText = styled.Text`
		color: ${white}
	`,
	SharesText = styled.Text`
		font-weight: bold
	`,
	FlatListView = styled.View`
		margin-vertical: 10
		border-bottom-color: ${grayXLight}
		border-bottom-width: 1
		padding-bottom: 10
	`,
	TextContainer = styled.View`
		align-items: center
	`

const styles = StyleSheet.create({
	h2: {
		flex: 1,
		marginBottom: 10
	},
	sort: {
		marginLeft: 10
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
    	sortPurchaseHistory: () => dispatch( reversePurchases() ),
    	sortSaleHistory: () => dispatch( reverseSales() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
