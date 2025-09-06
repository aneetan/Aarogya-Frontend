import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Camp } from '../../types/camp.types';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import CampDetails from './CampDetails';

interface CampCardsProps {
   camps: Camp[];
}

const CampCards: React.FC<CampCardsProps> = ({camps}) => {
   const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
   const [showDetailsModal, setShowDetailsModal] = useState(false);

   const handleSeeDetails = (camp: Camp) => {
      setSelectedCamp(camp);
      setShowDetailsModal(true);
   };

   const handleCloseModal = () => {
      setShowDetailsModal(false);
      setSelectedCamp(null);
   };

   
  return (
   <>
   {camps.map((camp, index) => (
      <motion.div
         key={camp.id}
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         viewport={{ once: true }}
         className="bg-white rounded-2xl overflow-hidden mb-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
         <div className="p-6">
            <div className="flex flex-col justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800">{camp.name}</h3>
            <p className="text-sm font-semi-bold text-gray-600">Organized By: {camp.organizer}</p>
            </div>
            
            <div className="flex items-center text-gray-600 mb-5">
            <FaMapMarkerAlt className="mr-2 text-[var(--primary-color)]" />
            <span>{camp.location}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm mb-5">
            <div className="flex items-center text-gray-600">
               <FaCalendarAlt className="mr-2 text-[var(--primary-color)]" />
               <span>{new Date(camp.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-gray-600">
               <FaClock className="mr-2 text-[var(--primary-color)]" />
               <span>{camp.starting_time} - {camp.ending_time}</span>
            </div>
            </div>
            
            <div className="mb-5">
            <h4 className="font-semibold text-gray-700 mb-2">Services Offered:</h4>
            <div className="flex flex-wrap gap-2">
               {camp.services.map((service, idx) => (
                  <span 
                  key={idx} 
                  className="px-3 py-1 bg-blue-50 text-[var(--primary-color)] text-xs font-medium rounded-full"
                  >
                  {service}
                  </span>
               ))}
            </div>
            </div>

            <div className='flex gap-2 items-center'>
            <button className="w-1/2 py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white
            font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            View location
            </button>

            <button
            onClick={() => handleSeeDetails(camp)}
            className="w-1/2 py-3 hover:bg-[var(--primary-color)] border-2 border-[var(--primary-color)]
            text-[var(--primary-color)] font-medium rounded-xl shadow-md hover:shadow-lg transition-all
            duration-300 hover:text-white">
            See details
            </button>
            </div>
         </div>
      </motion.div>
      ))}

      {showDetailsModal && selectedCamp && (
         <CampDetails
         camp={selectedCamp} 
         onClose={handleCloseModal} 
         />
      )}
   </>
  )
}

export default CampCards
