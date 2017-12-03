import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray  } from '../utils/colors'

export default class Card extends Component {

  render() {
    const { deck } = this.props
    return(
      <View style={styles.container}>
        <Text style={{fontSize: 24}}>
          {deck.title}
        </Text>
        <Text style={{fontSize: 14, color: gray}}>
          {deck.questions ? deck.questions.length : 0 } Cards
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {       
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
})
