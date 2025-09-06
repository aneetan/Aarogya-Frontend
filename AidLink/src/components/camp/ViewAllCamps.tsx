import { useState } from "react";
import type { Camp } from "../../types/camp.types";
import CampCards from "./CampCards"
import { FaPlus, FaSearch } from "react-icons/fa";
import BasicMap from "../map/BasicMap";

const ViewAllCamps = () => {
  const [searchQuery, setSearchQuery] = useState('');
    const camps: Camp[] = [
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
      services: ["Eye Examination", "Cataract Screening", "Free Glasses"],
      lat: 23.6345,
      long: 85.3803
    },
    {
      id: 3,
      name: "Women & Child Health Camp",
      location: "Primary School",
      organizer: "Red Cross",
      contact: "+91-8765432109",
      description: "Healthcare camp focused on women and children's health, offering vaccinations, maternal health services, and nutrition guidance",
      date: new Date("2024-01-20"),
      days: 2,
      starting_time: "8:00 AM",
      ending_time: "6:00 PM",
      services: ["Vaccination", "Maternal Health", "Child Nutrition"],
      lat: 20.9517,
      long: 85.0985
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
      services: ["Dental Checkup", "Tooth Cleaning", "Oral Health Education"],
      lat: 25.0961,
      long: 85.3131
    }
  ];

   const filteredCamps = camps.filter(camp => 
    camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camp.services.some(service => 
      service.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
     <section className="min-h-screen bg-gray-50 mb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Discover Life-Changing Health Camps
          </h1>
          <p className="text-base max-w-xl mx-auto text-gray-700">
            Access free medical checkups and essential healthcare services through dedicated heath camps.
          </p>
        </div>
        <button
          className="px-4 py-3 rounded-xl text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-medium flex items-center
          shadow-md hover:shadow-lg transition-all duration-300 border-2 border-[var(--primary-color)] text-sm float-right mb-4"
        >
          <FaPlus className="mr-2" />
          Add New Camp
        </button>

        <div className="flex flex-col md:flex-row gap-4 w-full h-[100vh]">
          {/* Left Side - Camp Listings */}
          <div className="bg-white rounded-xl shadow-lg md:w-[30%] w-full p-6 h-full flex flex-col">
            <div className="flex flex-col h-full">
              <div className="sticky top-0 bg-white pb-4 z-10">
              <h2 className="font-bold text-2xl text-[var(--primary-color)] mb-4"> Available Health Camps </h2>
              
              {/* Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <FaSearch className="text-gray-500"/>
              </div>
              <input
                type="text"
                placeholder="Search camps by name or services"
                className="w-full pl-10 pr-4 py-2 border-gray-400 border-2 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <CampCards camps={filteredCamps.length > 0 ? filteredCamps : camps} />

              {filteredCamps.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No health camps found matching your search.
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="rounded-xl shadow-gray-400 w-[70%]">
            <div className="relative h-full z-0">
              <BasicMap/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default ViewAllCamps;
