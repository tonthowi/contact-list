import Alert from './components/Alert'
import Input from './components/Input'
import Shell from './components/Shell'
import Empty from './components/Empty'
import Dropdown from './components/Dropdown'
import Button from './components/Button'
import { DocumentMagnifyingGlassIcon, DocumentIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'


const ContactList = (props) => {
    const isSearching = props.searchValue.length > 0
    const hasContacts = props.peoples.length > 0

    const menuItems = [
        { text: 'Sort alphabetically A-Z', onClick: props.sortAlphabetically },
        { text: 'Sort newly added', onClick: props.sortNewlyAdded },
    ]

    return (
      <Shell
      >
        <h3 className="text-base font-semibold leading-6 text-gray-900">Contact List</h3>
        <div className='flex space-x-2'>
            <div className='flex-grow'>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search contacts"
                  value={props.searchValue}
                  onChange={props.handleSearchChange}
                />
            </div>
            <div>
                <Dropdown
                    onClick={props.sortAlphabetically}
                    options="Sort"
                    menuItems={menuItems}
                />
            </div>
        </div>
        {props.alert.show &&
          <Alert
            messages={props.alert.messages}
            show={props.alert.show}
            setAlert={props.setAlert}
          />
        }
        
        {hasContacts && (
            <p className='text-xs text-gray-500'>
                Showing <span className='font-bold'>{props.peoples.length}</span> contacts
            </p>
        )}

        {!hasContacts && !isSearching && (
          <Empty
            text="No contacts available"
            icon={<DocumentIcon/>}
          />
        )}

        {!hasContacts && isSearching && (
          <Empty
            text={`No search results with the keyword ${ props.searchValue } found`}
            searchKeyword={props.searchValue}
            icon={<DocumentMagnifyingGlassIcon />}
          />
        )}


        <ul role="list" className="divide-y divide-gray-200">
        <AnimatePresence >
          {props.peoples.map(person => (
            <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={person.id}
                className="flex gap-x-4 py-5">
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.phoneNumber}</p>
                <div className='mt-2 space-x-2'>
                <Button
                    primaryButton={false}
                    onClick={() => props.onEdit(person.id)}
                    icon={<PencilSquareIcon />}
                  />
                  <Button
                    primaryButton={false}
                    onClick={() => props.onDelete(person.id)}
                    icon={<TrashIcon />}
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        </ul>
      </Shell>
    )
  }

export default ContactList