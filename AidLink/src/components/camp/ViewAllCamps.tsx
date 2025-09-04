import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPlus, FaSearch } from 'react-icons/fa';
import type { Camp } from '../../types/camp.types';

const ViewAllCamps = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for upcoming health camps
  const upcomingCamps: Camp[] = [
    {
      id: 2,
      name: "Eye Care Camp",
      location: "Community Center, Jharkhand",
      organizer: "Red Cross",
      date:   "2024-01-18",
      days: 2,
      starting_time: "10:00 AM",
      ending_time: "4:00 PM",
      services: ["Eye Examination", "Cataract Screening", "Free Glasses"],
    },
    {
      id: 3,
      name: "Women & Child Health Camp",
      location: "Primary School, Odisha",
      organizer: "Red Cross",
      date: "2024-01-20",
      days: 2,
      starting_time: "8:00 AM",
      ending_time: "6:00 PM",
      services: ["Vaccination", "Maternal Health", "Child Nutrition"],
    },
    {
      id: 4,
      name: "Dental Care Camp",
      organizer: "Red Cross",
      location: "Rural Health Center, Bihar",
      date: "2024-01-22",
      days: 2,
      starting_time: "10:00 AM",
      ending_time: "4:00 PM",
      services: ["Dental Checkup", "Tooth Cleaning", "Oral Health Education"],
    }
  ];

  const filteredCamps = upcomingCamps.filter(camp =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    camp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full py-16 px-4 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Health Camp Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find upcoming health camps in your area to get free health care services
          </p>
        </motion.div>

        {/* Search and Add Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative flex-1 max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search camps by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-400  transition-all duration-300"
            />
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-3 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium flex items-center
            shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaPlus className="mr-2" />
            Add New Camp
          </button>
        </motion.div>

        {/* Upcoming Camps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCamps.map((camp, index) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
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

                <button className="w-1/2 py-3 hover:bg-[var(--primary-color)] border-2 border-[var(--primary-color)] text-[var(--primary-color)] 
                font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:text-white">
                  See details
                </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCamps.length === 0 && (
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
        )}
      </div>
    </section>
  );
};

export default ViewAllCamps;