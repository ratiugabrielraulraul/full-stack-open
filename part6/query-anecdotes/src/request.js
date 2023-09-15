import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdotes = newAnecdote => axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateVote = (updateAnecdote) => {
  axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res =>res.data)
}