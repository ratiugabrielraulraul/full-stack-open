import { createSlice } from "@reduxjs/toolkit";



const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// Helper function to generate unique IDs
const getId = () => (100000 * Math.random()).toFixed(0);

// Define initial state using the array of anecdotes
const initialState = anecdotesAtStart.map((anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
}));

// Create a slice using createSlice
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState, // Use the initial state
  reducers: {
    createAnecdote: (state, action) => {
      // Payload contains the content for the new anecdote
      const { content } = action.payload;
      state.push({
        content,
        id: getId(), // Generate a unique ID
        votes: 0,
      });
    },
    voteAnecdote: (state, action) => {
      const id = action.payload.id;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
  },
});

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;