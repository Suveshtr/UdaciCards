import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

const DECK_STORAGE_KEY = 'UdaciCatds:decks'

export function saveDeckTitle({title}) {
  AsyncStorage.setItem('UdaciCatds:decks', JSON.stringify(title), () => {
  
    AsyncStorage.getItem('UdaciCatds:decks', (err, result) => {
      console.log(result);
    });
  });

}
