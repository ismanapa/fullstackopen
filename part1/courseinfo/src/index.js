import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    );
};

const Part = ({ title, exercises }) => {
    return (
        <p>
            {title} {exercises}
        </p>
    );
};

const Content = ({ partsInfo }) => {
    return (
        <>
            <Part title={partsInfo[0].name} exercises={partsInfo[0].exercises} />
            <Part title={partsInfo[1].name} exercises={partsInfo[1].exercises} />
            <Part title={partsInfo[2].name} exercises={partsInfo[2].exercises} />
        </>
    );
};

const Total = ({ exercises }) => {
    return (
        <p>Number of exercises {exercises}</p>
    );
}




const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content content={[part1, part2, part3]} />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div >
    )
}

ReactDOM.render(<App />, document.getElementById('root'))