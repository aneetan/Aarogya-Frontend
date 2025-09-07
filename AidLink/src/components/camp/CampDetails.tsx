import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import type { Camp } from '../../types/camp.types';

interface CampDetailsProps {
   camp: Camp;
   onClose: () => void;
}

const CampDetails: React.FC<CampDetailsProps> = ({ camp, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{camp.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Camp Details</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-[var(--primary-color)]" />
                  <span>{camp.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-[var(--primary-color)]" />
                  <span>{camp.starting_time} - {camp.ending_time} ({camp.days} day{camp.days > 1 ? 's' : ''})</span>
                </div>
                <div className="text-gray-600">
                  <span> <span className="font-medium">Starting From:</span> {new Date(camp.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">Organized by:</span> {camp.organizer}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
              <p className="text-gray-600">{camp.contact}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600">{camp.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CampDetails;