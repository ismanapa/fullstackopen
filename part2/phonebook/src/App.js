import React, { useState, useEffect } from 'react';

import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import Notification from './components/notification';

import phonesService from './services/phonesService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const [notificationSuccessMessage, setNotificationSuccessMessage] = useState('')
  const [notificationErrorMessage, setNotificationErrorMessage] = useState('')


  useEffect(() => {
    phonesService
      .getAll()
      .then(response => setPersons(response));
  }, [])


  const handleNameChange = event => setNewName(event.target.value);
  const handlePhoneChange = event => setNewPhone(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const setSuccessMessage = (message) => {
    setNotificationSuccessMessage(message);
    setTimeout(() => {
      setNotificationSuccessMessage(null)
    }, 5000);
  };

  const setErrorMessage = (message) => {
    setNotificationErrorMessage(message);
    setTimeout(() => {
      setNotificationErrorMessage(null)
    }, 5000);
  };

  const addNewPerson = event => {
    event.preventDefault();

    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        
        phonesService
          .update({
            ...existingPerson,
            phone: newPhone
          })
          .then(response => {
            setPersons(persons.map(p => p.id !== response.id ? p : response))
            setNewName('');
            setNewPhone('');
            setSuccessMessage(`Updated ${response.name}`);
          })
          .catch(() => {
            setErrorMessage(`Information of '${existingPerson.name}' has already been removed from server`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          });

      }
    } else {
      const newPerson = { name: newName, phone: newPhone };
      phonesService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('');
          setNewPhone('');
          setSuccessMessage(`Added ${response.name}`);
        });

    }

  };

  const deletePerson = person => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonesService.remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          setSuccessMessage(`Deleted ${person.name}`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {notificationSuccessMessage && <Notification isError={false} message={notificationSuccessMessage} />}
      {notificationErrorMessage && <Notification isError={true} message={notificationErrorMessage} />}

      <Filter handleFilterChange={handleFilterChange} filter={filter} />

      <h2>add new</h2>

      <PersonForm
        name={newName}
        phone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        onSubmit={addNewPerson} />


      <h2>Numbers</h2>

      <Persons
        onDelete={deletePerson}
        persons={persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))} />

    </div>
  )
};

export default App;
