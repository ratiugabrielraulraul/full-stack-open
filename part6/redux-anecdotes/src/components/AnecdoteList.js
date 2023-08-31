import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (anecdote, votes) => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        console.log('vote', id)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )

}
export default AnecdoteList