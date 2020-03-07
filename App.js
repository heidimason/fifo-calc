import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import store from './src/store'
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
		<Provider store={store}>
			<FifoCalculator />
		</Provider>
	)
}
