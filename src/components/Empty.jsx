import { AnimatePresence, motion } from "framer-motion";

const Empty = (props)  =>{
  return (
    <AnimatePresence>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
    >
       <div className="mx-auto w-7 h-7 text-gray-500 mt-8 ">{props.icon}</div>
        <p className="mt-3 text-sm text-gray-500">{props.text}</p>
    </motion.div>
    </AnimatePresence>
  )
}

export default Empty;
