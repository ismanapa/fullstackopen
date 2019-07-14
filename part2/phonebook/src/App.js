import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = event => setNewName(event.target.value);
  const handlePhoneChange = event => setNewPhone(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const addNewPerson = event => {
    event.preventDefault();

    const nameExists = persons.some(p => p.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPerson = { name: newName, phone: newPhone };

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('');
        setNewPhone('');
      });

  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h2>add new</h2>

      <PersonForm
        name={newName}
        phone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        onSubmit={addNewPerson} />


      <h2>Numbers</h2>

      <Persons persons={persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))} />

    </div>
  )
};

export default App;
