import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createAnecdote, setNotification, resetNotification }) => {

    const create = event => {
        event.preventDefault();
        createAnecdote(event.target.anecdote.value);

        setNotification(`Anecdote created '${event.target.anecdote.value}'`);

        setTimeout(() => {
            resetNotification();
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    resetNotification
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);