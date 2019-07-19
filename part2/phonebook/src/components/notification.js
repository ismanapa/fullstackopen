import React from 'react';

const Notification = ({ isError, message }) => {
    const baseStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    const style = {
        ...baseStyle,
        color: (isError ? 'red' : 'green')
    };

    return <p style={style}>{message}</p>
}

export default Notification;