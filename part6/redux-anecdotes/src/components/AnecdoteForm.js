import React, { Fragment } from 'react';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {

    const create = event => {
        event.preventDefault();
        store.dispatch(createAnecdote(event.target.anecdote.value));

        store.dispatch(setNotification(`Anecdote created '${event.target.anecdote.value}'`))

        setTimeout(() => {
            store.dispatch(resetNotification());
        }, 5000);

        event.target.anecdote.value = '';
    };

    return (
        <Fragment>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </Fragment>
    );
};

export default AnecdoteForm;