import React from 'react';

import Part from './Part';

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(({ id, name, exercises }) => <Part key={id} title={name} exercises={exercises} />)}
        </>
    );
};

export default Content;