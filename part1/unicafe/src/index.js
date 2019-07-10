import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => (
    <h1>
        {title}
    </h1>
);

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
);

const Statistic = ({ value, text }) => (
    <p>{text} {value}</p>
);

const FeedbackSetter = ({ onFeedbackGood, onFeedbackNeutral, onFeedbackBad }) => (
    <div>
        <Button onClick={onFeedbackGood} text={'good'} />
        <Button onClick={onFeedbackNeutral} text={'neutral'} />
        <Button onClick={onFeedbackBad} text={'bad'} />
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
            <Statistic value={good} text={'good'} />
            <Statistic value={neutral} text={'neutral'} />
            <Statistic value={bad} text={'bad'} />
            <Statistic value={total} text={'all'} />
            <Statistic value={score / total} text={'average'} />
            <Statistic value={good / total * 100} text={'positive'} />
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