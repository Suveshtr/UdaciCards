import { ADD_DECK_TITLE, ADD_CARD } from '../actions'

function decks ( state = {}, action ) {
  switch (action.type) {
    case ADD_DECK_TITLE:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }
    case ADD_CARD:
      return {
        ...state,
        [action.title] : addCard(...state[action.title], action)
      }
    default: 
      return state
  }
}

const addCard = ( state, action ) => {
  switch ( action.type ) {
    case ADD_CARD:
      return {
        ...state,
        questions: [...State['questions'], action.card]
      }
  }
}

export default decks