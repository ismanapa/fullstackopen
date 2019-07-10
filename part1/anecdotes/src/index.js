import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const Header = ({ title }) => <h1>{title}</h1>;

const Anecdote = ({ anecdote, votes }) => (
    <div>
        <h3>{anecdote}</h3>
        <p>has {votes} votes</p>
    </div>
);

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    const setNextAnecdote = () => {
        setSelected(getRandomInt(0, anecdotes.length - 1));
    };

    const voteCurrentAnecdote = () => {
        votes[selected] += 1;
        setVotes([...votes]);
    };

    const mostVotedAnecdoteIndex = votes.indexOf(Math.max(...votes));

    return (
        <div>

            <Header title={'Anecdote of the day'} />
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />

            <div>
                <button onClick={voteCurrentAnecdote}>vote</button>
                <button onClick={setNextAnecdote}>next anecdote</button>
            </div>

            <Header title={'Anecdote with most votes'} />
            <Anecdote anecdote={anecdotes[mostVotedAnecdoteIndex]} votes={votes[mostVotedAnecdoteIndex]} />

        </div>
    );
}



ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)