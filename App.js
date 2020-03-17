import React from 'react'
import Root from './Root'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './src/screens/HomeScreen'
import HistoryScreen from './src/screens/HistoryScreen'

const navigator = createStackNavigator(
	{
    	Home: HomeScreen,
    	History: HistoryScreen
  	},
  	{
    	initialRouteName: 'Home',
    	defaultNavigationOptions: {
    		headerShown: false
    	}
  	}
)

const FifoCalculator = createAppContainer(navigator)

export default () => {
	return (
		<Root>
			<FifoCalculator />
		</Root>
	)
}
