//importing express
const express = require('express')
const app = express()

const morgan = require('morgan')

//To show data sent on http post req we need to install npm morgan morgan-body 
const morganBody = require('morgan-body')
//enable logging of req body
morganBody(app)

//When making req we use tiny format to display message logs
//morgan middleware needs to be defined before defining routes
app.use(
    morgan('tiny', {stream: process.stdout})
)

app.use(express.json())

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
]

//(1)The route defines an event handler that handles HTTP GET requests made to the notes path of the application
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// fetching a single resource
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    // if person does not exist responde with status code 404 not found
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phone book has info for ${persons.length} people</p><p>${new Date()}></p>`
    )
})

app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
})

const generateId = () => {
    const randomId = persons.length > 0 ? Math.random(...persons.map(n => n.id)) : 0
    return randomId * 1000000;
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(404).json({
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


    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const delPerson = persons.filter(person => person.id !== id)
    response.json(delPerson)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})