import React, { useState } from 'react';
import type { CampFormData } from '../../types/camp.types';
import MapPicker from '../map/MapPicker';
import { validateForm } from '../../utils/validateForm.utils';

const CampForm: React.FC = () => {
  const [formData, setFormData] = useState<CampFormData>({
    name: '',
    location: '',
    organizer: '',
    contact: '',
    description: '',
    date: new Date(),
    days: 1,
    starting_time: '10:00',
    ending_time: '16:00',
    lat: 0,
    lng: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: number | Date | string = value;
    
    // Handle different input types
    if (type === 'number') {
      processedValue = parseFloat(value) || 0;
    } else if (type === 'date') {
      processedValue = new Date(value);
    }
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name] && isSubmitted) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

   const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      lat,
      lng
    }));

     if ((errors.lat || errors.lng) && isSubmitted) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.lat;
        delete newErrors.lng;
        return newErrors;
      });
    }
  };

  const validateFormData = () : boolean => {
   const validationError = validateForm(formData);
    setErrors(validationError);
    return  Object.keys(validationError).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(!validateFormData()) return;
    console.log('Form submitted:', formData);
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden h-full">
          <div className="px-4 py-4 sm:px-6 sm:py-6 h-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--primary-color)] mb-4 sm:mb-6">
              Add New Camp
            </h2>

            <div className="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-8 h-auto">
               {/* Map Section */}
               <div className="w-full lg:w-1/2 h-70 lg:h-96 z-0">
                  <div className="mb-4">
                     <p className="text-sm text-gray-600">
                        Click on the map to set the exact coordinates for your camp location.
                     </p>
                  </div>
                  <div className="h-full min-h-[300px] lg:min-h-[85vh]">
                    <MapPicker
                      onLocationSelect={handleLocationSelect}
                    />
                  </div>
               </div>

               {/* Form Section */}
               <div className="w-full lg:w-1/2 mt-16 md:mt-0 lg:mt-0">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6 mb-4 flex-grow">
                     {/* Basic Information */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="md:col-span-2 lg:col-span-1">
                           <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Camp Name *
                           </label>
                           <input
                           type="text"
                           id="name"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                           placeholder="Enter camp name"
                           />
                           {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="md:col-span-2 lg:col-span-1">
                           <label htmlFor="location" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Location *
                           </label>
                           <input
                           type="text"
                           id="location"
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
                              focus:border-transparent text-sm sm:text-base"
                           placeholder="Enter location"
                           />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>
                     </div>

                     {/* Organizer & Contact */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                           <label htmlFor="organizer" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Organizer *
                           </label>
                           <input
                           type="text"
                           id="organizer"
                           name="organizer"
                           value={formData.organizer}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
                              focus:border-transparent text-sm sm:text-base"
                           placeholder="Enter organizer name"
                           />
                           {errors.organizer && <p className="mt-1 text-sm text-red-600">{errors.organizer}</p>}
                        </div>

                        <div>
                           <label htmlFor="contact" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Contact Information *
                           </label>
                           <input
                           type="text"
                           id="contact"
                           name="contact"
                           value={formData.contact}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
                              focus:border-transparent text-sm sm:text-base"
                           placeholder="Enter phone number"
                           />
                           {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
                        </div>
                     </div>

                     {/* Description */}
                     <div>
                        <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Description *
                        </label>
                        <textarea
                           id="description"
                           name="description"
                           rows={4}
                           value={formData.description}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                           placeholder="Describe the camp and the services provided"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                     </div>

                     {/* Date & Duration */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                           <label htmlFor="date" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Start Date *
                           </label>
                           <input
                           type="date"
                           id="date"
                           name="date"
                           value={formData.date.toISOString().split('T')[0]}
                           onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                           />
                           {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                        </div>

                        <div>
                           <label htmlFor="days" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Duration (days) *
                           </label>
                           <input
                           type="number"
                           id="days"
                           name="days"
                           min="1"
                           value={formData.days}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                           />
                           {errors.days && <p className="mt-1 text-sm text-red-600">{errors.days}</p>}
                        </div>
                     </div>

                     {/* Time */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                        <label htmlFor="starting_time" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Start Time
                        </label>
                        <input
                           type="time"
                           id="starting_time"
                           name="starting_time"
                           value={formData.starting_time}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                        {errors.starting_time && <p className="mt-1 text-sm text-red-600">{errors.starting_time}</p>}
                        </div>
                        <div>
                        <label htmlFor="ending_time" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           End Time
                        </label>
                        <input
                           type="time"
                           id="ending_time"
                           name="ending_time"
                           value={formData.ending_time}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                        {errors.ending_time && <p className="mt-1 text-sm text-red-600">{errors.ending_time}</p>}
                        </div>
                     </div>

                     {/* Coordinates */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                           <label htmlFor="lat" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Latitude
                           </label>
                           <input
                           type="number"
                           id="lat"
                           name="lat"
                           step="any"
                           value={formData.lat}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                           placeholder="e.g., 40.7128"
                           />
                            {errors.lat && <p className="mt-1 text-sm text-red-600">{errors.lat}</p>}
                        </div>

                        <div>
                           <label htmlFor="lng" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">
                           Longitude
                           </label>
                           <input
                           type="number"
                           id="lng"
                           name="lng"
                           step="any"
                           value={formData.lng}
                           onChange={handleChange}
                           className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2
                              focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                           placeholder="e.g., -74.0060"
                           />
                           {errors.lng && <p className="mt-1 text-sm text-red-600">{errors.lng}</p>}
                        </div>
                     </div>

                     {/* Submit Button */}
                     <div className="flex justify-center pt-2 sm:pt-6 lg:mb-4">
                        <button
                           type="submit"
                           className="w-full sm:w-auto px-6 py-3 bg-[var(--primary-color)] text-white font-semibold
                           rounded-md hover:bg-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-darker)]
                           focus:ring-offset-2 transition-colors duration-200 text-sm sm:text-bas cursor-pointer"
                        >
                           Create Camp
                        </button>
                     </div>
                  </form>

               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampForm;