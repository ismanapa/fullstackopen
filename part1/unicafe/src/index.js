import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => (
    <h1>
        {title}
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

    if (total === 0) {
        return <p>No feedback given</p>
    }

    return (
        <div>
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
            <Header title={'give feedback'} />
            <FeedbackSetter
                onFeedbackGood={increaseGoodFeedback}
                onFeedbackNeutral={increaseNeutralFeedback}
                onFeedbackBad={increaseBadFeedback} />
            <Header title={'statistics'} />
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