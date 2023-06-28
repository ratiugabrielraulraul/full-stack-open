//importing express
const express = require('express');
const app = express();

//dotenv must be imported before the person model
require("dotenv").config();
const Person = require('./models/person');
const morgan = require('morgan');
const cors = require('cors');


//To show data sent on http post req we need to install npm morgan morgan-body 
const morganBody = require('morgan-body');
const person = require('./models/person');
//enable logging of req body
morganBody(app);

//When making req we use tiny format to display message logs
//morgan middleware needs to be defined before defining routes
app.use(
    morgan('tiny', { stream: process.stdout })
)
app.use(cors());
/*to make express show static content,
  whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address.
   If a correct file is found, express will return it.
*/
app.use(express.static('build'));
app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
];

//(1)The route defines an event handler that handles HTTP GET requests made to the notes path of the application
app.get('/api/persons', (request, response) => {
    //Person.find fetches all the documents from the 'Person' collection in the MongoDB 
    Person.find({})
        .then(persons => {
            response.json(persons);
        })
});

// fetching a single resource
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then((person) => {
            //if the id provided to the url doesnt exist respond with 404 
            if (person) {
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        //if the id is not wrote in the correct formmat respond with 400
        .catch((error) => {
            console.log(error);
            response.status(400).send({ error: 'malformatted id' })

        })
});

app.get('/info', (request, response, next) => {
    Person.find({})
        .then((people) => {
            response.send(
                `<p>Phone book has info for ${persons.length} people</p><p>${new Date()}></p>`
            )
        })
        .catch((error) => next(error))
});

app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
});

const generateId = () => {
    const randomId = persons.length > 0 ? Math.random(...persons.map(n => n.id)) : 0;
    return randomId * 1000000;
};

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Name or Number are missing."
        })
    }

    /**
     * We use some() to iterate through the persons array and check if any person's name
     * matches the one provided in the request body.
     * If a match is found return true indicating that the name already exists
     * Otherwise it returns false
     */
    const nameExists = persons.some((person) => person.name === body.name)
    if (nameExists) {
        return response.status(400).json({
            error: "Name already exists"
        })
    }
    // const person = {
    //     name: body.name,
    //     number: body.number,
    //     id: generateId(),
    // };
    // persons = persons.concat(person);
    // response.json(person);

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    // const delPerson = persons.filter(person => person.id !== id);
    // response.json(delPerson);
    // response.status(204).end();
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
            console.log(result)
        })
        .catch((error) => next(error))
});
app.put('/api/persons/:id', (request, response, next) => {

    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

//The error handler checks if the error is a CastError exception,which is an error was caused by an invalid object id for Mongo
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});