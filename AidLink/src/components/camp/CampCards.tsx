import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Camp } from '../../types/camp.types';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import CampDetails from './CampDetails';
import { useNavigate } from 'react-router';
import { getCampStatus, getStatusBadgeClass } from '../../helpers/campStatusHelpers';
import { formatTimeToAMPM } from '../../helpers/timeHelpers';

interface CampCardsProps {
  camps: Camp[];
  onViewLocation?: (camp: Camp) => void;
}

const CampCards: React.FC<CampCardsProps> = ({ camps, onViewLocation }) => {
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();

  const handleSeeDetails = (camp: Camp) => {
    setSelectedCamp(camp);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedCamp(null);
  };

  const handleViewLocation = (camp: Camp) => {
    if (onViewLocation) {
      onViewLocation(camp);
    }
  };

  return (
    <>
      {camps.map((camp, index) => {
        const { status, label } = getCampStatus(camp);
        const formattedStartTime = formatTimeToAMPM(camp.starting_time);
        const formattedEndTime = formatTimeToAMPM(camp.ending_time);

        return (
          <motion.div
            key={camp.id}
            id={`camp-${camp.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden mb-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 relative"
          >
            {/* Status Badge */}
            

            <div className="p-6">
              <div className="flex flex-col justify-between items-start mb-4">
               <div>
                  <h3 className="text-xl font-bold text-gray-800">{camp.name}</h3>
                  <p className="text-sm font-semi-bold text-gray-600">Organized By: {camp.organizer}</p>
                </div>

                <div className={`absolute right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(status)}`}>
                  {label}
               </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-5">
                <FaMapMarkerAlt className="mr-2 text-[var(--primary-color)]" />
                <span>{camp.location}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-5">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-[var(--primary-color)]" />
                  <span>
                    {new Date(camp.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    {camp.days > 1 && ` (${camp.days} days)`}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2 text-[var(--primary-color)]" />
                  <span>{formattedStartTime} - {formattedEndTime}</span>
                </div>
              </div>

              <div className='flex gap-2 items-center'>
                <button 
                  onClick={() => {
                    navigate('/camps');
                    handleViewLocation(camp);
                  }}
                  className="w-1/2 py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white
                  font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={status === 'expired'}
                >
                  {status === 'expired' ? 'Event Ended' : 'View location'}
                </button>

                <button
                  onClick={() => handleSeeDetails(camp)}
                  className="w-1/2 py-3 hover:bg-[var(--primary-color)] border-2 border-[var(--primary-color)]
                  text-[var(--primary-color)] font-medium rounded-xl shadow-md hover:shadow-lg transition-all
                  duration-300 hover:text-white"
                >
                  See details
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}

      {showDetailsModal && selectedCamp && (
        <CampDetails
          camp={selectedCamp} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default CampCards;