import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface TTSControlProps {
   isTTSEnabled: boolean;
   toggleTTS: () => boolean;
   isDisabled: boolean;
}
const TTSControl: React.FC<TTSControlProps> = ({isTTSEnabled, toggleTTS, isDisabled}) => {
   const handleClick = () => {
      const success = toggleTTS();
      if (!success) {
         // You could show a toast notification here
         console.warn("Text-to-speech is not supported in your browser");
      }
   };

   const isSupported = 'speechSynthesis' in window;

   if (!isSupported) {
      return (
         <button
         disabled={true}
         className="h-8 w-8 p-0 flex items-center justify-center rounded-full opacity-50 cursor-not-allowed text-gray-400"
         title="Text-to-speech not supported in your browser"
         >
         <FaVolumeMute className="h-4 w-4" />
         </button>
      );
   }

  return (
    <>
       <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 ${
               isTTSEnabled 
                  ? ' bg-red-500 text-gray-100' 
                  : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            title={isTTSEnabled ? "Mute responses" : "Enable voice responses"}
            >
            {isTTSEnabled ? (
               <FaVolumeUp className="h-4 w-4" />
            ) : (
               <FaVolumeMute className="h-4 w-4" />
            )}
            </button>
       </div>
    </>
  )
}

export default TTSControl
