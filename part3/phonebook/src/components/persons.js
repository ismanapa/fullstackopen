import React from 'react';

import Person from './person';

const Persons = ({ persons, onDelete }) => (
	persons.map(p => <Person onDelete={onDelete} key={p.name} person={p} />)
);

export default Persons;