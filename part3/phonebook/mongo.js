// (first command) npm install mongoose
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
//(2) node mongo.js <password>
const password = process.argv[2]
//MongoDB URI
const url = `mongodb+srv://raul5528:${password}@cluster0.eygop7i.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

//After establishing the connection to the database, we define the schema for a note and the matching model
// The schema tells Mongoose how the note objects are to be stored in the database.

const personSchema = new mongoose.Schema({
    name: String,
    number: String

})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 3) {
    //Fetching objects from the database
    //The objects are retrieved from the database with the find method
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]


    //Next, the application creates a new note object with the help of the Note model
    const person = new Person({
        name: name,
        number: number
    }
    )

    person.save().then(result => {
        console.log(`Added ${name} and number ${number} to the phonebook database!`)
        mongoose.connection.close()
    })

}