import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdotes } from '../reducers/anecdoteReducer';
import { appStyles, headerStyles, buttonStyles } from "../styles"
import { setTimedNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const filteredAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );


  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAnecdotes(id));
    dispatch(setTimedNotification(`You voted '${content}'`, 2)); // Use setTimedNotification with custom duration

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
              <button onClick={() => vote(anecdote.id, anecdote.content)} style={buttonStyles}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
