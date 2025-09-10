import { useEffect, useRef, useState } from "react";
import type { Camp } from "../../types/camp.types";
import CampCards from "./CampCards"
import { FaArrowLeft, FaPlus, FaSearch } from "react-icons/fa";
import BasicMap from "../map/BasicMap";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { viewCamps } from "../../api/camp.api";
import { getRoleFromToken } from "../../utils/jwt.utils";
import { useNavigate } from "react-router";

const ViewAllCamps = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const [showAllCamps, setShowAllCamps] = useState(true);
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(token!);
  const navigate = useNavigate();

  const campListRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useQuery<AxiosResponse<Camp[]>, AxiosError, Camp[]>({
    queryKey: ['camps'],
    queryFn: viewCamps,
  });

  const camps = data || []  

  const filteredCamps = camps.filter(camp => 
    camp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to the selected camp when it changes
  useEffect(() => {
    if (selectedCamp && campListRef.current) {
      const campElement = document.getElementById(`camp-${selectedCamp.id}`);
      if (campElement) {
        campElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Add highlight effect
        campElement.classList.add('bg-blue-50', 'border-blue-300');
        
        // Remove highlight after some time
        setTimeout(() => {
          campElement.classList.remove('bg-blue-50', 'border-blue-300');
        }, 2000);
      }
    }
  }, [selectedCamp]);

   const handleCampSelect = (camp: Camp | null) => {
    setSelectedCamp(camp);
    setShowAllCamps(false);
  };

  const handleViewLocation = (camp: Camp) => {
    setSelectedCamp(camp);
    setShowAllCamps(false); 
  };

  const handleBackToAllCamps = () => {
    setSelectedCamp(null);
    setShowAllCamps(true);
  };

   const displayCamps = showAllCamps ? 
    (filteredCamps.length > 0 ? filteredCamps : camps) : 
    (selectedCamp ? [selectedCamp] : []);

    
   if (isLoading) return <div>Loading camps...</div>;
   if (error) return <div>Error: {error.message}</div>;

  return (
    <>
     <section className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Discover Life-Changing Health Camps
          </h1>
          <p className="text-sm md:text-base max-w-xl mx-auto text-gray-700">
            Access free medical checkups and essential healthcare services through dedicated heath camps.
          </p>
        </div>

        {role === 'local_body' ? (
            <button
            onClick={() => navigate('/add-camp')}
            className="px-4 py-3 rounded-xl text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-medium flex items-center
            shadow-md hover:shadow-lg transition-all duration-300 border-2 border-[var(--primary-color)] text-sm float-right mb-4"
          >
            <FaPlus className="mr-2" />
            Add New Camp
          </button>

        ): ('')}

        {/* Map at the top for mobile screens */}
          <div className="lg:hidden rounded-xl overflow-hidden shadow-md w-full h-100 mb-6">
            <div className="relative w-full z-0 object-contain">
              <BasicMap 
                camps={camps} 
                onCampSelect={handleCampSelect}
                selectedCamp={selectedCamp}
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-700">Click on markers for details</p>
              </div>
            </div>
          </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full lg:h-[100vh]">
          {/* Left Side - Camp Listings */}
          <div className="bg-white rounded-xl shadow-lg lg:w-[35%] w-full p-4 md:p-6 flex flex-col">
            <div className="flex flex-col h-full">
              <div className="sticky top-0 bg-white pb-4 z-10">

                {!showAllCamps ? (
                  <button 
                    onClick={handleBackToAllCamps}
                    className="flex items-center text-[var(--primary-color)] mb-4 font-medium"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to all camps
                  </button>
                ) : (
                  <h2 className="font-bold text-xl md:text-2xl text-[var(--primary-color)] mb-4"> 
                    Available Health Camps 
                  </h2>
                )}
              
              {/* Search */}
             {showAllCamps && (
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
                )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
               <CampCards camps={displayCamps} onViewLocation={handleViewLocation} />

               {showAllCamps && filteredCamps.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No health camps found matching your search.
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="hidden lg:block rounded-xl shadow-gray-400 w-[70%]">
            <div className="relative h-full z-0">
               <BasicMap 
                camps={displayCamps} 
                onCampSelect={handleCampSelect}
                selectedCamp={selectedCamp}
              />
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
