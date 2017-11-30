import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, purple, white } from '../utils/colors'


class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: title
    }
  }



  render() {
    const { deck, navigation } = this.props
    
    return (
      <View style={styles.container}>
        <Text style={{fontSize:45, color: purple}}>{deck.title}</Text>
        <Text style={{fontSize:24, color: gray}}>{deck.questions.length} Card(s)</Text>
        <AddBtn onPress={() => { navigation.navigate('AddCard', {deck} )}} />
        <QuizBtn onPress={() => { navigation.navigate('DeckQuiz', {deck} )}} />
      </View>
    )
  }
}

function AddBtn ({ onPress }) {
   return (
     <TouchableOpacity 
       style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
       onPress={onPress}>
         <Text style={styles.BtnText}>Add Card</Text>
     </TouchableOpacity>
   )
 }

function QuizBtn ({ onPress }) {
   return (
     <TouchableOpacity 
       style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
       onPress={onPress}>
         <Text style={styles.BtnText}>Start Quiz</Text>
     </TouchableOpacity>
   )
 }



function mapStateToProps(state, {navigation}) {

  return {
    deck: state[navigation.state.params.title]
  }
}

export default connect(mapStateToProps)(DeckDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
   },
   androidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
   },
   BtnText: {
     color: white,
     fontSize: 22,
     textAlign: 'center'
   },

})