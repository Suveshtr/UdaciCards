import React, { Component } from 'react'
import { 
  KeyboardAvoidingView, 
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import { white, blue, purple } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends Component {
  
  static navigationOptions = {
    title: 'Add Card',
  }

  state = {
    question: '',
    answer: '',
    error: {
      question: {
        status: false,
        detail: '',
      },
      answer: {
        status: false,
        detail: '',
      }
    }
  }

  submit = () => {
    const { question, answer } = this.state
    const { navigation, dispatch } = this.props
    //deck's format: {"title":"Spring","Questions":[null]}
    const { deck } = navigation.state.params
    
    const card = {question: question, answer: answer }

    Keyboard.dismiss()
    let error = this.state.error

    if (question.length > 0 && answer.length > 0 ) {
      addCardToDeck(deck.title, card)
        .then(() =>{ 
          error = this.setError(error, false, '', 'question')
          error = this.setError(error, false, '', 'answer')
        })
        .then(dispatch(addCard(deck.title, card)))
        .then(navigation.navigate('DeckDetail', {title: deck.title}))
    
    } else {
      
      if ( !question.length ) {
        error = this.setQuestionError(error, true, 'Please enter a question!')        
      }
        
      if ( !answer.length ) {
        error = this.setAnswerError(error, true, 'Please enter an answer!')        
      }  
    }
   
    this.setState(() => ({
      ...this.state,
      error: error
    }))
  }

  setQuestionError = (error, status, detail) => (
    this.setError(error, status, detail, 'question')
  )

  setAnswerError = (error, status, detail) => (
    this.setError(error, status, detail, 'answer')
  )

  setError = (error, status, detail, key) => (
    {...error, [key]: {
      status: status,
      detail: detail,
    }}
  )

  handleQuestionTextChange = (input) => {
    this.setCardValue(input, 'question')
  }

  handleAnswerTextChange = (input) => {
    this.setCardValue(input, 'answer')
  }

  setCardValue = (input, key) => {
     this.setState(() => ({
      ...this.state,      
      [key]: input,
      error: {
        ...this.state.error,
        [key]: {
          status: false,
          detail: '',
        }
      }
    }))
  }

  render () {
    
    const { error, question, answer } = this.state
    
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container} >
        
        <TextInput style={styles.input}
          value={question}
          placeholder="Question"
          onChangeText={this.handleQuestionTextChange}          
        />
        { error.question.status && (
          <Error detail={error.question.detail} ></Error>
        )}
        <TextInput style={styles.input}
          value={answer}
          placeholder="Answer"
          onChangeText={this.handleAnswerTextChange}
        />
        { error.answer.status && (
          <Error detail={error.answer.detail} ></Error>
        )}
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(AddCard)

function Error ({ detail }) {
  return (
    <Text style={{fontSize: 10, color: 'red'}} >{detail}</Text>
  )
}

function SubmitBtn ({ onPress }) {
   return (
     <TouchableOpacity 
       style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidBtn}
       onPress={onPress}>
         <Text style={styles.submitBtnText}>SUBMIT</Text>
     </TouchableOpacity>
   )
 }

const styles = StyleSheet.create ( {
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    height:45,
    borderRadius: 5,
    borderColor: purple,
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 20,
  },
  iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 40,
      marginBottom: 10,
   },
   androidBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 5,
      height: 45,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 10,
   },
   submitBtnText: {
     color: white,
     fontSize: 22,
     textAlign: 'center',
     
   },
})
