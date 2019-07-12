import React from 'react';

import Part from './Part';

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(({ name, exercises }) => <Part title={name} exercises={exercises} />)}
        </>
    );
};

export default Content;