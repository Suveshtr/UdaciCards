export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const ADD_CARD = 'ADD_CARD'

export function addTitle (title) {
  return {
    type: ADD_DECK_TITLE,
    title
  }
}

export function addCard (title, question, answer) {
  return {
    type: ADD_CARD,
    title,
    card: {question: question, answer: answer}
  }
}