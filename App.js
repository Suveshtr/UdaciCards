import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import {createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import CreateDeck from './components/CreateDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import DeckList from './components/DeckList'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight  }}>
      <StatusBar  translucent backgroundColor = {backgroundColor} {...props} />
    </View>
  )
}

const store = createStore(reducers)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />        
          <MainNavigator />
        </View>
      </Provider>
      
    );
  }
}

const Tabs = TabNavigator({
  
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    }
  },
  
  Deck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  
}, { 
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      padding: 10,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowRadius: 6,
      shadowOpacity: 1,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
      width: 0,
      height: 3
    },
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },

  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  
})
