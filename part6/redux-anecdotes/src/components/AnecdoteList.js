import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Notification from './Notification';
import Filter from './Filter';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({
    anecdotesToShow,
    voteAnecdote,
    setNotification,
    resetNotification
}) => {

    const vote = anecdote => {
        voteAnecdote(anecdote.id);
        setNotification(`You voted '${anecdote.content}'`);

        setTimeout(() => {
            resetNotification();
        }, 5000);
    };

    return (
        <Fragment>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            {anecdotesToShow
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

const anedoteSelector = ({ anecdotes, filter }) => {
    return anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            return b.votes - a.votes;
        });
};

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anedoteSelector(state),
    };
};

const mapDispatchToProps = {
    voteAnecdote,
    setNotification,
    resetNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);