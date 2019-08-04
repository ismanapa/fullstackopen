import React from 'react';

import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = id => {
    props.store.dispatch(voteAnecdote(id));
  }



  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .map(anecdote =>
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
      <h2>create new</h2>

      <AnecdoteForm store={props.store} />

    </div>
  )
}

export default App