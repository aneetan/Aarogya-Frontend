// hooks/useSpeechRecognition.ts
import { useState, useEffect, useRef} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const useSpeechRecognitionHook = (onAutoSend: () => void) => {
  const [isListening, setIsListening] = useState(false);
   const [silenceTimeout, setSilenceTimeout] = useState<number | null>(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  //Auto-send message after user stops speaking
  useEffect(() => {
    if( isListening && transcript) {
      if(silenceTimeout) {
        clearTimeout(silenceTimeout);
      }

      const timeout = setTimeout(() => {
        if (isListening && transcript.trim()) {
          onAutoSend();
          stopListening();
        }
      }, 2000);

      setSilenceTimeout(timeout);
      return () => {
        if (silenceTimeout) {
          clearTimeout(silenceTimeout);
        }
      };
    }
  }, [transcript, isListening, onAutoSend]);

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (silenceTimeout) {
      clearTimeout(silenceTimeout);
      setSilenceTimeout(null);
    }
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