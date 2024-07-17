import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Forms from './Forms'
import ContactList from './ContactList'

import peopleService from './services/peoples.js'
import EditModal from './components/modal/EditModal.jsx'

const App = () => {
  const [peoples, setPeoples] = useState([])
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSearch, setShowSearch] = useState('')
  const [alert, setAlert] = useState({messages: [], show: false})
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editNumber, setEditNumber] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeoples => {
        setPeoples(initialPeoples)
        console.log('Initialize peoples from the json',initialPeoples)
      })
  },[])

  const resetFormFields = () => {
    setNewName('')
    setNewEmail('')
    setNewNumber('')
  }

  const resetEditFormFields = () => {
    setEditName('')
    setEditEmail('')
    setEditNumber('')
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

    if (duplicateMessages.length > 0) {
      setAlert({ messages: duplicateMessages, show: true })
    } else {
      peopleService
        .create(formData)
        .then(returnedData => {
          console.log('New contact added',returnedData)
          setPeoples([formData, ...peoples])
          resetFormFields()
          setAlert({ messages: [], show: false })
        })
    }
  }

  const sortAlphabetically = () => {
    const sortedAtoZ = [...peoples].sort((a, b) => {
      if (!a.name || !b.name) {
        return 0
      }
      return a.name.localeCompare(b.name)
    })
    setPeoples(sortedAtoZ)
  }

  const sortNewlyAdded = () => {
    const sortedNewlyAdded = [...peoples].sort( (a, b) => b.timestamp - a.timestamp )
    setPeoples(sortedNewlyAdded)
  }

  const personToShow = showSearch === ''
     ? peoples
     : peoples.filter(person => person.name.toLowerCase().includes(showSearch.toLowerCase()))

  const handleEdit = (id) => {
    const person = peoples.find(person => person.id === id)
    if (person) {
      setEditId(id)
      setEditName(person.name)
      setEditEmail(person.email)
      setEditNumber(person.phoneNumber)
      setEditModalVisible(true)
    }
  }

  const handleSaveEdit = () => {
    const updatedPerson = {
      id: editId,
      name: editName,
      email: editEmail,
      phoneNumber: editNumber,
      timestamp: peoples.find(person => person.id === editId).timestamp
    }

    peopleService
      .update(editId, updatedPerson)
      .then(returnedPerson => {
        console.log('Contact updated', returnedPerson)
        setPeoples(peoples.map(person => person.id !== editId ? person : returnedPerson))
        resetEditFormFields()
        setAlert({ messages: [], show: false })
        setEditModalVisible(false)
      })
      .catch(error => {
        console.error('Error updating contact', error)
        setAlert({ messages: ['Error updating contact'], show: true })
      })
  }
  
  const handleDeletion = id => {
    peopleService
      .remove(id)
      .then(removedPeople => {
        console.log('Contact deleted', removedPeople)
        setPeoples(peoples.filter(person => person.id !== id))
      })
  }

  const handleSearchChange = (event) => {
    event.preventDefault()
    setShowSearch(event.target.value)
  }

  const handleNameCreate = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleEmailCreate = (event) => {
    event.preventDefault()
    setNewEmail(event.target.value)
  }

  const handleNumCreate = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleNameEdit = (event) => {
    event.preventDefault()
    setEditName(event.target.value)
  }

  const handleEmailEdit = (event) => {
    event.preventDefault()
    setEditEmail(event.target.value)
  }

  const handleNumEdit = (event) => {
    event.preventDefault()
    setEditNumber(event.target.value)
  } 

  return (
    <div className='min-h-screen max-w-full space-y-6 p-4 sm:p-4 lg:p-4'>
      <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>

        <Forms
          onSubmit={addPerson}
          handleNameChange={handleNameCreate}
          handleEmailChange={handleEmailCreate}
          handleNumChange={handleNumCreate}
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
          onEdit={handleEdit}
          onDelete={handleDeletion}
          alert={alert}
          setAlert={(alertState) => {
            setAlert(alertState)
            if (!alertState.show) resetFormFields()
          }}
        />

      </div>
      <EditModal
        show= {editModalVisible}
        onClose= {() => setEditModalVisible(false)}
        title="Edit"
        onSubmit= {
          (event) => {
            event.preventDefault()
            handleSaveEdit()
          }
        }
        nameValue={editName}
        onNameChange={handleNameEdit}
        emailValue={editEmail}
        onEmailChange={handleEmailEdit}
        phoneNumberValue={editNumber}
        onPhoneNumberChange={handleNumEdit}
      />
    </div>
  )
}

export default App