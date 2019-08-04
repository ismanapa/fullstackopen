import React, { Fragment } from 'react';

import Notification from './Notification';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {

    const anecdotes = store.getState().anecdotes;

    const vote = anecdote => {
        store.dispatch(voteAnecdote(anecdote.id));
        store.dispatch(setNotification(`You voted '${anecdote.content}'`))

        setTimeout(() => {
            store.dispatch(resetNotification());
        }, 5000);
    };

    return (
        <Fragment>
            <h2>Anecdotes</h2>
            <Notification store={store} />
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
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </Fragment>
    );
};

export default AnecdoteList;