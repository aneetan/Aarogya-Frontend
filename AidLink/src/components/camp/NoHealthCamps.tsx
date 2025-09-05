import {motion} from 'framer-motion'

const NoHealthCamps = () => {
  return (
    <>
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      >
      <div className="text-gray-400 mb-4 text-6xl">🔍</div>
      <p className="text-gray-500 text-lg">
         No health camps found matching your search criteria.
      </p>
      <p className="text-gray-400 mt-2">
         Try adjusting your search term
      </p>
   </motion.div>
      
    </>
  )
}

export default NoHealthCamps
