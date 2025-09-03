// hooks/useSpeechRecognition.ts
import { useState, useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const useSpeechRecognitionHook = () => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    transcript,
    isListening,
    browserSupportsSpeechRecognition,
    toggleListening,
    resetTranscript
  };
};