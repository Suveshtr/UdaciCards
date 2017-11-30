import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'

class AddCard extends Component {
  render () {
    return (
      <View>
        <Text>
          Add Card
        </Text>
      </View>
    )
  }
}

function mapStateToProps ( state ) {
  return {
    Decks: state
  }
}

export default connect(mapStateToProps)(AddCard)