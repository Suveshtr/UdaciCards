import React, { Compoenet } from 'react'
import { View, Text } from 'react-native'

export default class Deck extends Component {

  render() {
    const { deck } = this.props
    return(
      <View>
        <Text>
          Deck Title {deck.title}
        </Text>
      </View>
    )
  }
}
