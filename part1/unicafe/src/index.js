import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = () => (
    <h1>
        give feedback
    </h1>
);

const FeedbackSetter = ({ onFeedbackGood, onFeedbackNeutral, onFeedbackBad }) => (
    <div>
        <button onClick={onFeedbackGood}>good</button>
        <button onClick={onFeedbackNeutral}>neutral</button>
        <button onClick={onFeedbackBad}>bad</button>
    </div>
);

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const score = good * 1 - bad * 1;

    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {score / total}</p>
            <p>positive {good / total * 100} %</p>
        </div>
    );
};

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const increaseGoodFeedback = () => {
        setGood(good + 1);
    };

    const increaseNeutralFeedback = () => {
        setNeutral(neutral + 1);
    };

    const increaseBadFeedback = () => {
        setBad(bad + 1);
    };

    return (
        <>
            <Header />
            <FeedbackSetter
                onFeedbackGood={increaseGoodFeedback}
                onFeedbackNeutral={increaseNeutralFeedback}
                onFeedbackBad={increaseBadFeedback} />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad} />
        </>
    );
}

ReactDOM.render(<App />,
    document.getElementById('root')
);