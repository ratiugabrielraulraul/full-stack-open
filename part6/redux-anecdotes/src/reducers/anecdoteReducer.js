const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//Define the Action Types
const VOTE = 'VOTE'

//Create an Action Creator for Voting
export const voteAnecdote = (id) => {
  return {
    type: VOTE,
    payload: { id }
  }
}

const initialState = anecdotesAtStart.map(asObject)


// Update the Reducer for Voting
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  switch (action.type) {
    case VOTE:
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const updatedAnectode = {
        ...anecdoteToVote,
        votes: anecdoteToVote + 1
      }
      return state.map(anecdote => anecdote.id === id ? updatedAnectode : anecdote)
    default:
      return state
  }

  console.log('action', action)

  return state
}


export default reducer