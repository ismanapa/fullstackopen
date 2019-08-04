import React from 'react';

import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {

    const create = event => {
        event.preventDefault();
        store.dispatch(createAnecdote(event.target.anecdote.value));
        event.target.anecdote.value = '';
    };

    return (
        <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    );
};

export default AnecdoteForm;