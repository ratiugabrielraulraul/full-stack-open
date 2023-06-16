import { useState, useEffect } from 'react';
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from 'axios';
import personService from './services/persons';
import Content from './components/Content'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPerson] = useState([])
  const [allPersons, setAllPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  //To continue implementing crud from module

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPerson(initialPerson)
      })

  }, [])
  console.log('render', persons.length, 'persons')


  //responsible for updating the 'newName'
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // addPersons is triggered when the form is submitted.
  // it prevents the default form submission behavior
  // creates a new person object with the current 'newName' value
  // adds it to the 'persons' array using the 'setPersons', and then clears the input field by resseting 'newName' to empty string
  const addPerson = (event) => {
    event.preventDefault();

    //we check using the find method to search for an existing person with the same name in the 'persons' array
    const existingPerson = persons.find((person) => person.name === newName);
    //if a person with the same name is found, an alert is displayed with the approapriate message, and the function returns early to prevent
    // further execution
    if (existingPerson) {
      alert(`${newName} is already added to the phone book`)
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
   
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPerson(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newPerson.name} to phonebook`)
      })
      


    // axios
    //   .post('http://localhost:3001/persons', newPerson)
    //   .then(response => {
    //     console.log(response)
    //     setPerson(persons.concat(response.data))
    //     setNewName('')
    //     setNewNumber('')
    //   })

    // setPerson([...persons, newPerson])
    // setNewName('')
    // setNewNumber('')


  }

  const handleNewNumbers = (event) => {

    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {

    setNewFilter(event.target.value)

    const regex = new RegExp(newFilter, 'i')

    const filteredPersons = () => persons.filter(person => person.name.match(regex));

    setPerson(filteredPersons)
  }
  const deletePerson = (id) => {

    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id

    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .remove(personId)
      console.log(`${personName} succesfully deleted`)
      setMessage(`${personName} was succesfully deleted!`)
      setAllPersons(allPersons.filter(person => person.id !== personId))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }



  }


  // in the JSX, I've added 'onSubmit' event listener to the form element, pointing it to the 'addPerson' func. The 'value' prop 
  // of the input field is set to 'newName', and the 'onChange' event is handled by the 'handleNameChange' funct.

  //To display the names in the last paragraph, I've used the 'map' funct to iterate over the 'persons' array. Each name is wrapped in a <p> element
  // and given a unique 'key' attribute using 'index' parameter of the 'map' function
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} handleNewNumbers={handleNewNumbers} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} deletePerson={deletePerson} />
    </div>
  )
}
export default App