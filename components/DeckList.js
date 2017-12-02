import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/helpers'
import DeckCard from './DeckCard'
import { Ionicons } from '@expo/vector-icons'

class DeckList extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props
    getDecks().then(decks => dispatch(receiveDecks(decks)))
  }

  navigate = (deck) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deck }
    )
  }

  render() {
    const { decks, navigation } = this.props
    return (
      !decks || Object.keys(decks).length === 0
        ? (
          <View style={styles.container}>
            <View style={styles.noItems}>
              {Platform.OS === 'ios'
                ? (<Ionicons name='ios-sad-outline' size={100} color='black' />)
                : (<Ionicons name='md-sad' size={100} color='black' />)
              }
              <Text>You haven't created any decks yet.</Text>
              <TouchableOpacity
                style={[styles.borderedItem, styles.createDeckBtn]}
                onPress={() => {
                  navigation.navigate('DeckCreate')
                }}
              >
                <Text>Create Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        : (
          <View style={styles.container}>
            {decks && Object.keys(decks).map(deck => (
              <TouchableOpacity 
                   style={[styles.row, styles.borderedItem]} key={decks[deck].title + '_row'} 
                   onPress={() => this.navigate(deck)}>
                <DeckCard key={decks[deck].title} deck={decks[deck]} />
              </TouchableOpacity>
            ))}
          </View>
        )
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  noItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    height: 100,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  borderedItem: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 5
  },
  createDeckBtn: {
    padding: 10,
    paddingLeft: 45,
    paddingRight: 45,
    margin: 15
  }
})

export default connect(mapStateToProps)(DeckList)