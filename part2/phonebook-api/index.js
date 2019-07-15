const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let persons = [
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

const generateId = () => {
    return Math.floor(Math.random() * 100000);
};

app.use(bodyParser.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.phone)
        return res.status(400).json({
            error: 'content missing'
        });

    const nameExists = persons.some(p => p.name === body.name);
    if (nameExists)
        return res.status(400).json({
            error: 'name must be unique'
        });

    const person = {
        name: body.name,
        phone: body.phone,
        id: generateId(),
    };

    persons = persons.concat(person)

    res.json(person);
});


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const person = persons.find(p => p.id === id);

    if (!person)
        return res.send(404);

    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    return res.send(204);
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