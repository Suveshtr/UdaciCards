import { ADD_DECK_TITLE, ADD_CARD, RECEIVE_DECKS } from '../actions'
// view of the store/state for decks
// decks : {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }

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
        [action.title] : addCard({...state[action.title]}, action)
      }

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
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
        questions: [...state['questions'], action.card]
      }
    default:
      return state
  }
}

export default decks