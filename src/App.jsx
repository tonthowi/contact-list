import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Forms from './Forms'
import ContactList from './ContactList'


const App = () => {
  const [peoples, setPeoples] = useState([
    // { id: '1', name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '1234567890' },
    // { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', phoneNumber: '9876543210' },
    // { id: '3', name: 'Alice Doe', email: 'alice.doe@example.com', phoneNumber: '0987654321' },
    // { id: '4', name: 'Bob Doe', email: 'bob.doe@example.com', phoneNumber: '2345678901' },
    // { id: '5', name: 'Charlie Doe', email: 'charlie.doe@example.com', phoneNumber: '3456789012' },
    // { id: '6', name: 'David Doe', email: 'david.doe@example.com', phoneNumber: '4567890123' },
    // { id: '7', name: 'Emily Doe', email: 'emily.doe@example.com', phoneNumber: '5678901234' },
    // { id: '8', name: 'Frank Doe', email: 'frank.doe@example.com', phoneNumber: '6789012345' },
    // { id: '9', name: 'Grace Doe', email: 'grace.doe,example.com', phoneNumber: '789012345' },
  ])
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSearch, setShowSearch] = useState('')
  const [alert, setAlert] = useState({message: [], show: false})

  const resetFormFields = () => {
    setNewName('')
    setNewEmail('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newEmail === '' || newNumber === '') {
      setAlert({ messages: ['Please fill in all fields'], show: true })
      return
    }
  
    const formData = {
      id: uuidv4(),
      name: newName,
      email: newEmail,
      phoneNumber: newNumber,
      timestamp: Date.now()
    }

    const duplicateMessages = []
    if (peoples.find(person => person.name === formData.name)) {
      duplicateMessages.push(`${formData.name} already exists in the contact list`)
    }
    if (peoples.find(person => person.email === formData.email)) {
      duplicateMessages.push(`${formData.email} already exists in the contact list`)
    }
    if (peoples.find(person => person.phoneNumber === formData.phoneNumber)) {
      duplicateMessages.push(`${formData.phoneNumber} already exists in the contact list`)
    }

    // Display alert if duplicate contact found in the list. Otherwise, add new contact to the list.
    if (duplicateMessages.length > 0) {
      setAlert({ messages: duplicateMessages, show: true })
    } else {
      setPeoples([formData, ...peoples]) // Add new contact to the list
      resetFormFields() // Reset form fields
      setAlert({ messages: [], show: false }) // Hide alert
    }}

  // Sort contacts alphabetically A to Z
  const sortAlphabetically = () => {
      const sortedAtoZ = [...peoples].sort( (a, b) => a.name.localeCompare(b.name) )
      setPeoples(sortedAtoZ)
  }
  // Sort contacts by the most recently added
  const sortNewlyAdded = () => {
    const sortedNewlyAdded = [...peoples].sort( (a, b) => b.timestamp - a.timestamp )
    setPeoples(sortedNewlyAdded)
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setShowSearch(event.target.value)
  }

  const personToShow = showSearch === ''
     ? peoples
     : peoples.filter(person => person.name.toLowerCase().includes(showSearch.toLowerCase()))

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleEmailChange = (event) => {
    event.preventDefault()
    setNewEmail(event.target.value)
  }

  const handleNumChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  return (
    <div className='min-h-screen max-w-full space-y-6 p-4 sm:p-4 lg:p-4'>

      <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>

        <Forms
          onSubmit={addPerson}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleNumChange={handleNumChange}
          nameValue={newName}
          emailValue={newEmail}
          numValue={newNumber}
        />
        <ContactList
          sortAlphabetically={sortAlphabetically}
          sortNewlyAdded={sortNewlyAdded}
          searchValue={showSearch}
          handleSearchChange={handleSearchChange}
          peoples={personToShow}
          alert={alert}
          setAlert={(alertState) => {
            setAlert(alertState)
            if (!alertState.show) resetFormFields()
          }}
        />

      </div>
      
    </div>
  )
}

export default App
