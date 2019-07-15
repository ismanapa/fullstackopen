const express = require('express');
const app = express();

const persons = [
    {
        "name": "Arto Hellas",
        "phone": "2222",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "phone": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "phone": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122",
        "id": 4
    }
];


app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const person = persons.find(p => p.id === id);

    if (!person)
        return res.send(404);

    res.json(person);
});

app.get('/info', (req, res) => {
    const response = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    `;
    res.send(response)
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});