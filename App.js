import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import PricePerShare from './src/components/PricePerShare'
import NumShares from './src/components/NumShares'
import SubmitBtn from './src/components/SubmitBtn'
import { grayDark, white } from './src/utils/styles/colors'
import { fonts } from './src/utils/styles/fonts'

export default function App() {
    return (
        <View style={styles.viewContainer}>
            <TextContainer>
                <Text
                    style={[fonts.h1, styles.text]}>FIFO Profit Calculator
                </Text>
            </TextContainer>

            <Text
                style={[fonts.h2, styles.text]}>Shares Purchased
            </Text>
            <PricePerShare />
            <NumShares />

            <Text
                style={[fonts.h2, styles.text]}>Shares Sold
            </Text>
            <PricePerShare />
            <NumShares />

            <SubmitBtn />

            <Text
                style={[fonts.h2, styles.text]}>Profit: {}
            </Text>
        </View>
    )
}

const TextContainer = styled.View`
    margin-top: 50
    align-items: center
`

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: grayDark,
        flex: 1
    },
    text: {
        color: white,
        marginTop: 50,
        marginBottom: 5,
        marginHorizontal: 40
    }
})
