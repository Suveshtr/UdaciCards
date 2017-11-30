import React, { Component } from 'react'
import { 
  KeyboardAvoidingView, 
  Text, 
  TextInput, 
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native'
import { white, blue, purple } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'

export default class CreateDeck extends Component {
  state = {
    title: '',
    error: {
      status: false,
      detail: '',
    }
  }

  submit = () => {
    const { title } = this.state
    
    Keyboard.dismiss()

    if (title.length > 0) {
      saveDeckTitle(title)
        .then(() => this.setError(false, ''))
    } else {
      this.setError(true, 'Deck Title is empty!')
    }
  }

  setError = (status, detail) => {
    this.setState(() => ({
        error : {
          status,
          detail
        }
      }))
  }

  handleTextChange = (input) => {

    this.setState(() => ({
      title: input,
      error: {
        status: false,
        detail: ''
      }
    }))

    
  }

  render () {
    const { title, error } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container} >
        <Text style={styles.label} >
          What is the title of your new deck?
        </Text>
        <TextInput style={styles.input}
          value={title}
          placeholder="Deck Title"
          onChangeText={this.handleTextChange}
        />
        { error.status && (
          <Text style={{fontSize: 10, color: 'red'}} >{error.detail}</Text>
        )}
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
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