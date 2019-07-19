require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Person = require('./models/person');

const app = express();

app.use(bodyParser.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan('tiny', {
    skip: function (req, res) { return req.method === "POST" }
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: function (req, res) { return req.method !== "POST" }
}));


app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons);
        });
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.phone)
        return res.status(400).json({
            error: 'content missing'
        });

    Person
        .find({ name: body.name })
        .then(personsWithName => {

            if (personsWithName.length !== 0)
                return res.status(400).json({
                    error: 'name must be unique'
                });

            const person = new Person({
                name: body.name,
                phone: body.phone,
            });

            person.save()
                .then(savedPerson => res.json(savedPerson));

        });
});


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const person = persons.find(p => p.id === id);

    if (!person)
        return res.sendStatus(404);

    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    return res.sendStatus(204);
});


app.get('/info', (req, res) => {
    const response = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
    `;
    res.send(response)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});