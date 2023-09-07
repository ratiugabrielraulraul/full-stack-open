import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { appStyles, headerStyles, inputStyles, buttonStyles } from "../styles"
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {

    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        const newAnecdote = await anecdoteService.create(content)
        // Dispatch the createAnecdote action with the content and other required data
        dispatch(createAnecdote(newAnecdote));

        dispatch(setNotification(`You added a new anecdote: "${content}"`)); // Dispatch a notification
        setTimeout(() => {
            console.log("Clearing Notification...");
            dispatch(clearNotification()); // Clear the notification after some time
        }, 5000);
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