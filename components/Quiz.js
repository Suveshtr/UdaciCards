import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Question from './Question'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { clearLocalNotifications, setLocalNotification } from '../utils/api'
import { white, gray, bue, red, green } from '../utils/colors'

export default class Quiz extends Component {
  
  state = { 
    score: 0, 
    questionNumber: 0, 
    showAnswer: false 
  }

  static navigationOptions = ({ navigation }) => {
    
    return { title: 'Quiz' }
  }

  flipCard = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const { title, questions } = deck
    
    const { questionNumber, score, showAnswer } = this.state

    if (questions.length === 0) {
      return (
        <View style={styles.container}>
          <View style={styles.noItems}>
            {Platform.OS === 'ios'
              ? (<Ionicons name='ios-sad-outline' size={100} />)
              : (<Ionicons name='md-sad' size={100} />)
            }
            <Text>You haven't created any cards yet.</Text>
          </View>
        </View>
      )
    }

    if (questionNumber >= questions.length) {
      clearLocalNotifications()
        .then(setLocalNotification)
    }
    return (
      <View style={styles.container}>
        {questionNumber < questions.length ? (
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <Text style={styles.counter}>{questionNumber + 1}/{questions.length}</Text>
            <Question 
              question={questions[questionNumber]} 
              showAnswer={showAnswer} 
              flipCard={this.flipCard}              
            />
            <View style={{ flex: 2 }}>
              <TouchableOpacity 
                  onPress={() => this.setState({ questionNumber: questionNumber + 1, score: score + 1 })} 
                  style={[styles.btn, styles.correctBtn]}>
                <Text style={[styles.btnText]}>
                  {Platform.OS === 'ios'
                      ? (<Ionicons name="ios-checkmark-circle-outline" style={styles.btnIcon} />)
                      : (<Ionicons name="md-checkmark-circle-outline" style={styles.btnIcon} />)}
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={() => this.setState({ questionNumber: questionNumber + 1 })} 
                  style={[styles.btn, styles.incorrectBtn]}>
                <Text style={styles.btnText}>
                  {Platform.OS === 'ios'
                      ? (<Ionicons name="ios-close-circle-outline" style={styles.btnIcon} />)
                      : (<MaterialCommunityIcons name="close-circle-outline" style={styles.btnIcon} />)
                  } Incorrect
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
            <View style={{ flex: 1 }}>
              <View style={styles.result}>
                <Text style={styles.resultText}>{score / questions.length * 100}% Correct</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity 
                    onPress={() => this.setState({ questionNumber: 0, score: 0, showAnswer: false })} 
                    style={[styles.btn, styles.genericBtn]}>
                  <Text style={styles.btnText}>
                    { Platform.OS === 'ios'
                        ? (<Ionicons name="ios-refresh" style={styles.btnIcon} />)
                        : (<Ionicons name="md-refresh" style={styles.btnIcon} />)} 
                    Try Again
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.genericBtn]}
                  onPress={() => this.props.navigation.navigate(
                    'DeckDetail', { title: title }
                  )}
                >
                  <Text style={styles.btnText}>
                    {Platform.OS === 'ios'
                      ? (<Ionicons name="ios-arrow-back" style={styles.btnIcon} />)
                      : (<Ionicons name="md-arrow-back" style={styles.btnIcon} />)}
                    Back to Deck
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 20
  },
  counter: {
    fontSize: 20,
    color: gray,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  result: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 28
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    padding: 15,
    width: 200,
    alignSelf: 'center'
  },
  correctBtn: {
    backgroundColor: green
  },
  incorrectBtn: {
    backgroundColor: red
  },
  genericBtn: {
    backgroundColor: gray
  },
  btnText: {
    color: white,
    fontSize: 18
  },
  btnIcon: {
    fontSize: 22,
    marginRight: 5
  },
  noItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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