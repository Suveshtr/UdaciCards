import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciCatds:decks'

export function saveDeckTitle(title) {
  
  return AsyncStorage.mergeItem('UdaciCatds:decks', JSON.stringify({
    [title]: {
      title: title,
      Questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
   return AsyncStorage.mergeItem('UdaciCatds:decks', JSON.stringify({
      [title]: {
        title: title,
        Questions: [card]
      }
    }))
}