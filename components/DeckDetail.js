import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//import { DeckDetail } from '../actions'

class DeckDetail extends Component {
  
  static navigationOptions = ({navigation}) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }

  render () {
    const { Decks } = this.props
    return (
      <View>
        <Text>
          {JSON.stringify(Decks)}
        </Text>
      </View>
    )
  }
}

function mapStateToProps (state) {
  
  return {
    Decks: state
  }
}

export default connect(mapStateToProps)(DeckDetail)