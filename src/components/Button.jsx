import { motion } from 'framer-motion';

const Button = (props) => {

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none'
        type={props.type}
        onClick={props.onClick}
      >
        {props.text}
      </motion.button>
    )
  }
  export default Button