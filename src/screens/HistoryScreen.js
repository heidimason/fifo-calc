import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { grayDark, grayXLight, white } from '../utils/styles/colors'
import styled from 'styled-components/native'

const HistoryScreen = props => {
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
		    <MaterialIcons
                color={white}
                name='close'
                size={RFPercentage(3)}
                style={styles.closeIcon}
    		/>

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
		background-color: ${grayDark}
		flex: 1
		justify-content: space-around
		flex-direction: row
	`,
	HistoryView = styled.View`
		margin-vertical: 20
		margin-horizontal: 40
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
    closeIcon: {
    	position: 'absolute',
    	right: 0
    }
})

export default HistoryScreen
