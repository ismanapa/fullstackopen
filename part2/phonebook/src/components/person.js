import React from 'react';

const Person = ({ person, onDelete }) => (
    <p >{person.name} - {person.phone} <button onClick={onDelete(person)}>delete</button></p>
);

export default Person;