import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { appStyles, headerStyles, inputStyles, buttonStyles } from "../styles"

const AnecdoteForm = () => {

    const dispatch = useDispatch();

 
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }


    return (
        <div style={appStyles}>
            <h2 style={headerStyles}>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" style={inputStyles}  /></div>
                <button type="submit" style={buttonStyles}>create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm