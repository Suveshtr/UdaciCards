import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { red, gray } from '../utils/colors'

export default class Question extends Component {

  render() {
    const { question, showAnswer, flipCard } = this.props
    return showAnswer ?
      (
        <View style={styles.container}>
          <Text style={styles.quiztext}>{question.answer}</Text>
          <TouchableOpacity onPress={() => flipCard()} >
            <Text style={styles.options}>Question</Text>
          </TouchableOpacity>
        </View>
      ) :
      (
        <View style={styles.container}>
          <Text style={styles.quiztext}>{question.question}</Text>
          <TouchableOpacity onPress={() => flipCard()} >
            <Text style={styles.options}>Answer</Text>
          </TouchableOpacity>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  quiztext: {
    fontSize: 30,
    textAlign: 'center',
  },
  options: {
    textAlign: 'center',
    color: red,
    fontSize: 28,
    marginTop: 10,
  }

})