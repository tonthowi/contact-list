import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'

const Alert = ({ messages, show, setAlert }) => {
  if (!show) return null

  return (
    <AnimatePresence>
    <motion.div
      className="rounded-md bg-red-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between">
        <div className='flex-shrink-0'>
          <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-auto">
          <h3 className="text-sm font-medium text-red-800">Cannot add new contact</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="-mx-1.5 -my-1.5">
          <button
            type="button"
            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            onClick={() => setAlert({ show: false, messages: [] })}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default Alert