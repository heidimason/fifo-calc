import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { grayXLight, white } from '../utils/styles/colors'
import { fonts } from '../utils/styles/fonts'
import styled from 'styled-components/native'

const History = props => {
	const { purchaseHistory, saleHistory } = props

	renderItem = ({ item, index }) => (
		<FlatListView>
			<HistoryText>
				<SharesText>Number of Shares</SharesText>: {item.num}
			</HistoryText>

			<HistoryText>
				<SharesText>Price of Shares</SharesText>: {item.price}
			</HistoryText>
		</FlatListView>
	)

	return (
        <HistoryContainer>
            <HistoryView>
        		<HistoryText>Purchases</HistoryText>

        		<FlatList
        			data={purchaseHistory}
        			renderItem={this.renderItem}
        			keyExtractor={
                        (purchase, index) => index.toString()
                    }>
            	</FlatList>
        	</HistoryView>

        	<HistoryView>
            	<HistoryText>Sales</HistoryText>

            	<FlatList
        			data={saleHistory}
        			renderItem={this.renderItem}
        			keyExtractor={
                        (sale, index) => index.toString()
                    }>
            	</FlatList>
        	</HistoryView>
        </HistoryContainer>
	)
}

const HistoryContainer = styled.View`
		flex-direction: row
		margin-horizontal: 40
		max-height: 100
	`,
	HistoryView = styled.View`
		width: 50%
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
	`

const styles = StyleSheet.create({
	h2: {
		marginBottom: 10
	},
	text: {
		color: white,
		marginHorizontal: 40
	}
})

export default History
