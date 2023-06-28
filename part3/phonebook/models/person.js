const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)


mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const numberValidator = [{

    validator: (number) => {
        if (number[2] === "-" || number[3] === "-" && number.length < 9) {
            return false;
        }
        return true;
    },
    message: "Must be atleast 8 digits"
},
{
    validator: (number) => {

        //start of the string is followed by 2-3 digits then - then one or more digits 
        return /^\d{2,3}-\d+$/.test(number)
    },
    message: "Must contain only digits"
},
]


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: numberValidator,
        required: true
    }

});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._idy
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)
