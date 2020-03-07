import React, { Component } from 'react'
import { FlatList, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { grayDark, grayXLight, white } from '../utils/styles/colors'
import { app } from '../utils/styles/app'
import { fonts } from '../utils/styles/fonts'

class HistoryScreen extends Component {
	state = {
		sortPurchasesDesc: true
	}

	toHome = () => {
        const { navigation } = this.props

        navigation.navigate('Home')
    }

    sortPurchases = () => {
    	const { purchaseHistory } = this.props.navigation.state.params

		this.setState(prevState => ({
			sortPurchasesDesc: !prevState.sortPurchasesDesc,
			purchaseHistory: purchaseHistory.reverse()
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
		const { profit } = this.props.navigation.state.params,
			{ sortPurchasesDesc } = this.state,
			{ purchaseHistory, saleHistory } = this.props

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

		        		<TouchableOpacity
		        			onPress={() => this.sortPurchases()}>
			        		{ sortPurchasesDesc ?
				        		<MaterialCommunityIcons
									color={white}
					                name='sort-descending'
					                size={RFPercentage(4)}
					                style={styles.sort}
								/>
								:
				        		<MaterialCommunityIcons
									color={white}
					                name='sort-ascending'
					                size={RFPercentage(4)}
					                style={styles.sort}
								/>
							}
						</TouchableOpacity>
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

				        		<MaterialCommunityIcons
									color={white}
					                name='sort-descending'
					                size={RFPercentage(4)}
					                style={styles.sort}
								/>

				        		<MaterialCommunityIcons
									color={white}
					                name='sort-ascending'
					                size={RFPercentage(4)}
					                style={styles.sort}
								/>
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

export default withNavigation( connect(mapStateToProps)(HistoryScreen) )
