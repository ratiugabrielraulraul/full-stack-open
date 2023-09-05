import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { appStyles, headerStyles, buttonStyles } from "../styles"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );


  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote({ id }))
  };

  return (
    <div style={appStyles}>
      <h2 style={headerStyles}>Anecdotes</h2>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id} style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)} style={buttonStyles}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
