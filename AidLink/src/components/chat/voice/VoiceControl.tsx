import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

interface  VoiceControlProps {
   isListening: boolean;
   toggleVoiceControl: () => void;
   isDisabled: boolean;
   browserSupportsSpeechRecognition: boolean;  
}
const VoiceControl: React.FC<VoiceControlProps> = ({
   isListening,
   toggleVoiceControl,
   isDisabled,
   browserSupportsSpeechRecognition
}) => {
   
   if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <button
          disabled={true}
          className="h-8 w-8 p-0 flex items-center justify-center rounded-full opacity-50 cursor-not-allowed text-gray-400"
          title="Speech recognition not supported in your browser"
        >
          <FaMicrophone className="h-4 w-4" />
        </button>
        <p className="text-xs text-gray-500 text-center">Voice not supported</p>
      </div>
    );
  }

  return (
    <>
     <div className="flex flex-col items-center space-y-2">
        <button
         onClick={toggleVoiceControl}
         disabled={isDisabled}
         className={`h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 ${
            isListening 
               ? 'bg-red-500 text-white animate-pulse shadow-lg' 
               : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
         } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
         >
         {isListening ? (
            <FaMicrophoneSlash className="h-4 w-4" />
         ) : (
            <FaMicrophone className="h-4 w-4" />
         )}
         </button>
 

         <p className="text-sm text-gray-500 text-center">
            {isListening ? "Listening.." : ""}
         </p>
     </div>
    </>
  );
};

export default VoiceControl
