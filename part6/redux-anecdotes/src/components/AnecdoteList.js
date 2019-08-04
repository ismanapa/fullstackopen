import React, { Fragment } from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {

    const anecdotes = store.getState().anecdotes;

    const vote = id => {
        store.dispatch(voteAnecdote(id));
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default AnecdoteList;