import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/filter';
import CountriesList from './components/countriesList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleChangeFilter = event => {
    setFilter(event.target.value)
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleChangeFilter} />
      <CountriesList countries={countriesToShow} />
    </div>
  );
}

export default App;
