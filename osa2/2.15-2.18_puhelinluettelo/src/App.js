import React, { useState, useEffect } from 'react'
import NewName from './components/NewName.js'
import Contacts from './components/Contacts.js'
import Search from './components/Search.js'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
        .then(result => {
            setPersons(result.data)
            setFiltered(persons.map(x => false))
        })
    } ,[], persons)

    const onSearch = (event) => {
        const search = event.target.value.toLowerCase()


        setFiltered(persons.map(x => {
            if (!(x.name + x.number).toLowerCase().includes(search)){
                return true
            } else {
                return false
            }
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (persons.reduce((cond, x) => {
            if (x.name === newName){
                cond = true
            }
            return cond
        }, false)){
            window.alert(`${newName} is already added to phonebook`)
        } else {
            setNewName('')
            setNewNumber('')
            
            const newNode = {
                name: newName, 
                number: newNumber
            }

            axios.post('http://localhost:3001/persons', newNode)
            .then(result => {
                setPersons(persons.concat(result.data))
                setFiltered(filtered.concat(false))
            }, result => {
                console.log('failed posting new person')
            })
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    return (
    <div>
        <h2>Phonebook</h2>
        <Search onSearch={onSearch} />
        <h2>add a new</h2>
        <NewName
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        />
        <h2>Numbers</h2>
        <Contacts persons={persons} filtered={filtered}/>
    </div>
  )

}

export default App