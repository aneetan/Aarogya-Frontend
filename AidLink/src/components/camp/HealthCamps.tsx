import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import type { Camp } from '../../types/camp.types';
import { useNavigate } from 'react-router';
import CampCards from './CampCards';
import NoHealthCamps from './NoHealthCamps';

const HealthCamps = () => {
  const navigate = useNavigate();

  const upcomingCamps: Camp[] = [
  {
    id: 2,
    name: "Eye Care Camp",
    location: "Community Center, Jharkhand",
    organizer: "Red Cross",
    contact: "+91-9876543210",
    description: "Free eye care camp providing comprehensive eye examinations, cataract screening, and free glasses for those in need",
    date: new Date("2024-01-18"),
    days: 2,
    starting_time: "10:00 AM",
    ending_time: "4:00 PM",
    lat: 23.6345,
    lng: 85.3803
  },
  {
    id: 3,
    name: "Women & Child Health Camp",
    location: "Primary School, Odisha",
    organizer: "Red Cross",
    contact: "+91-8765432109",
    description: "Healthcare camp focused on women and children's health, offering vaccinations, maternal health services, and nutrition guidance",
    date: new Date("2024-01-20"),
    days: 2,
    starting_time: "8:00 AM",
    ending_time: "6:00 PM",
    lat: 20.9517,
    lng: 85.0985
  },
  {
    id: 4,
    name: "Dental Care Camp",
    location: "Rural Health Center, Bihar",
    organizer: "Red Cross",
    contact: "+91-7654321098",
    description: "Free dental care camp providing comprehensive dental checkups, cleaning services, and oral health education",
    date: new Date("2024-01-22"),
    days: 2,
    starting_time: "10:00 AM",
    ending_time: "4:00 PM",
    lat: 25.0961,
    lng: 85.3131
  }
];
  return (
    <section className="w-full py-12 px-8 lg:px-8 bg-gray-100">
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
            Upcoming Health Camps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find upcoming health camps in your area to get free health care services
          </p>
        </motion.div>

        {/* Add Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div></div>
          <button
            onClick={() => navigate('/add-camp')}
            className="px-4 py-3 rounded-xl text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-medium flex items-center
            shadow-md hover:shadow-lg transition-all duration-300 border-2 border-[var(--primary-color)]"
          >
            <FaPlus className="mr-2" />
            Add New Camp
          </button>
        </motion.div>

        {/* Upcoming Camps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <CampCards camps={upcomingCamps} />
        </div>

        {upcomingCamps.length === 0 && (
           <NoHealthCamps/>
        )}

        <div className='py-6 flex justify-center items-center'>
          <button
            onClick={() => navigate('/camps')}
            className="px-4 py-3 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium flex items-center
            shadow-md hover:shadow-lg transition-all duration-300"
          >
            View All Camps
          </button>
        </div>

        
      </div>
    </section>
  );
};

export default HealthCamps;