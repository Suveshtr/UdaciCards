export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const ADD_CARD = 'ADD_CARD'

export function addTitle (title) {
  return {
    type: ADD_DECK_TITLE,
    title
  }
}
// card => {question: '', answer: ''}
export function addCard (title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}