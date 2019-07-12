import  React from 'react';

const Part = ({ title, exercises }) => {
    return (
        <p>
            {title} {exercises}
        </p>
    );
};

export default Part;