import React from 'react';

const CountriesList = ({ countries }) => {

    if (countries.length === 0)
        return <p>No matches</p>;

    if (countries.length > 10)
        return <p>Too many matches, specify another filter</p>;

    if (countries.length > 10)
    return countries.map(c =>
        <p>{c.name}</p>
    )
};

export default CountriesList;