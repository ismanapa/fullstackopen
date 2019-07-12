import React from 'react';

import Person from './person';

const Persons = ({ persons }) => (
    persons.map(p => <Person key={p.name} person={p} />)
);

export default Persons;