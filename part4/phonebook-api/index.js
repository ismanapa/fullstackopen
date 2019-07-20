require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Person = require('./models/person');

const app = express();

app.use(bodyParser.json());

morgan.token('body', function (req) { return JSON.stringify(req.body); });
app.use(morgan('tiny', {
	skip: function (req) { return req.method === 'POST'; }
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
	skip: function (req) { return req.method !== 'POST'; }
}));


app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(persons => res.json(persons))
		.catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if (!body.name || !body.phone)
		return res.status(400).json({
			error: 'content missing'
		});

	const person = new Person({
		name: body.name,
		phone: body.phone,
	});

	person.save()
		.then(savedPerson => res.json(savedPerson))
		.catch(error => next(error));

});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;
	const person = {
		name: body.name,
		phone: body.phone
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => res.json(updatedPerson))
		.catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => res.json(person))
		.catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(error => next(error));
});


app.get('/info', (req, res, next) => {

	Person.find({})
		.then(persons => {
			const response = `
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${Date()}</p>
                `;
			res.send(response);
		})
		.catch(error => next(error));


});

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError' && error.kind == 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});