import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

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

    setPersons(persons.concat({ name: newName, phone: newPhone }))
    setNewName('');
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} value={filter} />
      </div>
      <h2>add new</h2>
      <form onSubmit={addNewPerson} >
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>phone: <input onChange={handlePhoneChange} value={newPhone} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map(p => <p key={p.name}>{p.name} - {p.phone}</p>)}
    </div>
  )
};

export default App;
