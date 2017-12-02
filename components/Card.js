import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Card extends Component {

  render() {
    const { deck } = this.props
    return(
      <View>
        <Text>
          Deck Title : {deck.title}
        </Text>
        <Text>
          Cards({deck.questions.length})
        </Text>
      </View>
    )
  }
}
