import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Forms from './Forms'
import ContactList from './ContactList'

import peopleService from './services/peoples.js'


const App = () => {
  const [peoples, setPeoples] = useState([])
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSearch, setShowSearch] = useState('')
  const [alert, setAlert] = useState({message: [], show: false})

  // Handle API call to fetch contacts from the server and update the state with the response data 
  useEffect(() => {
    peopleService
    .getAll()
    .then(initialPeoples => {
      setPeoples(initialPeoples)
      console.log('Initialize peoples from the json',initialPeoples)
    })
  },[])

  // Reset form fields to default values for name, email, and phone number
  const resetFormFields = () => {
    setNewName('')
    setNewEmail('')
    setNewNumber('')
  }
  // Add new contact to the list of contacts and display alert if duplicate contact found
  const addPerson = (event) => {
    event.preventDefault()

    // Check if any of the form fields are empty. Display alert if any field is empty.
    if (newName === '' || newEmail === '' || newNumber === '') {
      setAlert({ messages: ['Please fill in all fields'], show: true })
      return
    }
    
    // Create new contact object with unique ID, current timestamp, and form data.
    const formData = {
      id: uuidv4(),
      name: newName,
      email: newEmail,
      phoneNumber: newNumber,
      timestamp: Date.now()
    }

    // Check for duplicate contacts in the list. Display alert if duplicates found.
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
      peopleService
      .create(formData)
      .then(returnedData => {
        console.log('New contact added',returnedData)
        setPeoples([formData, ...peoples]) // Add new contact to the list
        resetFormFields() // Reset form fields
        setAlert({ messages: [], show: false }) // Hide alert
      })
    }}

  // Sort contacts alphabetically A to Z
  const sortAlphabetically = () => {
    const sortedAtoZ = [...peoples].sort((a, b) => {
      if (!a.name || !b.name) {
        return 0
      }
      return a.name.localeCompare(b.name)
    })
    setPeoples(sortedAtoZ)
  }
  // Sort contacts by the most recently added
  const sortNewlyAdded = () => {
    const sortedNewlyAdded = [...peoples].sort( (a, b) => b.timestamp - a.timestamp )
    setPeoples(sortedNewlyAdded)
  }

  // Filter contacts based on search keyword
  const personToShow = showSearch === ''
     ? peoples
     : peoples.filter(person => person.name.toLowerCase().includes(showSearch.toLowerCase()))

  // Handle search input change
  const handleSearchChange = (event) => {
    event.preventDefault()
    setShowSearch(event.target.value)
  }

  // Handle name input change
  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  // Handle email input change
  const handleEmailChange = (event) => {
    event.preventDefault()
    setNewEmail(event.target.value)
  }

  // Handle phone number input change
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
