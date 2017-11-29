import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import CreateDeck from './components/CreateDeck'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight  }}>
      <StatusBar  translucent backgroundColor = {backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <CreateDeck />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
