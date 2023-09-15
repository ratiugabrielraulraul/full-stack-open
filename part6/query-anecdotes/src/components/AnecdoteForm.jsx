import { createAnecdotes } from '../request'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../notificationContext'


const AnecdoteForm = () => {


  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },

  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      dispatch({ type: 'showNotification', payload: "Anecdote must have a length of 5 or more characters." });
      setTimeout(() => {
        dispatch({ type: 'hideNotification' }); // Clear the notification after 5 seconds
      }, 5000);
      return; // Don't proceed with saving if length is less than 5
    }
    
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
    console.log('new anecdote')
    await dispatch({ type: 'showNotification', payload: `You added: ${content} !` })
    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
