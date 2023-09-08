import React from "react";
import { useDispatch } from "react-redux";
import { appStyles, headerStyles, inputStyles, buttonStyles } from "../styles"
import { createAnecdotes } from '../reducers/anecdoteReducer';
import { setTimedNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {

    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        // Dispatch the createAnecdote action with the content and other required data
        dispatch(createAnecdotes(content));

        dispatch(setTimedNotification(`You added a new anecdote: "${content}"`, 2)); // Dispatch a notification
    }

    return (
        <div style={appStyles}>
            <h2 style={headerStyles}>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" style={inputStyles} /></div>
                <button type="submit" style={buttonStyles}>create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm