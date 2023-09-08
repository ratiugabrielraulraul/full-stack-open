import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';



// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// // Helper function to generate unique IDs
// export const getId = () => (100000 * Math.random()).toFixed(0);

// // Define initial state using the array of anecdotes
// const initialState = anecdotesAtStart.map((anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// }));

// Create a slice using createSlice
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    voteAnecdote: (state, action) => {
      const id = action.payload.id;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }

  },
});


export const initializeAnecdotes = () => {

  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};
export const voteAnecdotes = (id) => {
  return async (dispatch) => {
    await anecdoteService.update(id);
    dispatch(voteAnecdote({ id }));
  };
};

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;