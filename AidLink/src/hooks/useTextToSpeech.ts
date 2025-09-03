import { useState } from "react"

export const useTextToSpeech = () => {
   const [isTTSEnabled, setIsTTSEnabled] = useState(true);

   const speakText = (text: string) => {
      if(!isTTSEnabled || !('speechSynthesis' in window)) return;

      const textToSpeak = typeof text === 'string' ? text : String(text);

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => {
         console.log('Finished speaking');
      };

      utterance.onerror = (event) => {
         console.error('Speech synthesis error', event);
      };

      window.speechSynthesis.speak(utterance);
   }; 

   const toggleTTS = () => {
      if (!('speechSynthesis' in window)) {
         return false;
      }
      
      // If we're disabling TTS, cancel any ongoing speech
      if (isTTSEnabled) {
         window.speechSynthesis.cancel();
      }
      
      setIsTTSEnabled(!isTTSEnabled);
      return true;
   };

   return {
      isTTSEnabled,
      speakText,
      toggleTTS
   };
}