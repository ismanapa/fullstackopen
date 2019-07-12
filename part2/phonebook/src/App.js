import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '0000' }]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleNameChange = event => setNewName(event.target.value);
  const handlePhoneChange = event => setNewPhone(event.target.value);

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
      <form onSubmit={addNewPerson} >
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>phone: <input onChange={handlePhoneChange} value={newPhone} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => <p key={p.name}>{p.name} - {p.phone}</p>)}
    </div>
  )
};

export default App;
