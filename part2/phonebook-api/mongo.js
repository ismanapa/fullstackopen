const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-8wyxq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
});

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:');
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.phone}`);
            });
            mongoose.connection.close();
        });
}

if (process.argv.length === 5) {
    const person = new Person({
        name: String(process.argv[3]),
        phone: String(process.argv[4])
    });

    person
        .save()
        .then(response => {
            console.log(`added ${response.name} number ${response.phone} to phonebook`);
            mongoose.connection.close()
        });
}


