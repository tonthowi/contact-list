import { motion } from 'framer-motion';

const Button = (props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`border border-transparent rounded-md text-sm font-medium focus:outline-none
        ${props.primaryButton
          ? 'w-full py-2 px-4 text-white bg-slate-900 hover:bg-slate-800 shadow-sm'
          : 'p-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.primaryButton ? (
        props.text
      ) : (
        <div className='min-h-4 min-w-4'>
          {props.icon}{props.text}
        </div>
      )}
    </motion.button>
  )
}

export default Button;