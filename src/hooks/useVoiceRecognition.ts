import { useState, useEffect, useCallback } from 'react';

interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getSpeechRecognition = useCallback(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      return SpeechRecognition ? new SpeechRecognition() : null;
    }
    return null;
  }, []);

  useEffect(() => {
    const speechRecognition = getSpeechRecognition();
    setIsSupported(!!speechRecognition);
  }, [getSpeechRecognition]);

  const parseVoiceCommand = (transcript: string): string | null => {
    const text = transcript.toLowerCase().trim();
    
    // Number mappings
    const numberWords: { [key: string]: string } = {
      'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
      'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
      'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
      'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
      'eighteen': '18', 'nineteen': '19', 'twenty': '20'
    };

    // Operation mappings
    const operations: { [key: string]: string } = {
      'plus': '+', 'add': '+', 'and': '+',
      'minus': '-', 'subtract': '-', 'take away': '-',
      'times': '×', 'multiply': '×', 'multiplied by': '×',
      'divide': '÷', 'divided by': '÷', 'over': '÷'
    };

    // Special commands
    if (text.includes('clear') || text.includes('reset')) {
      return 'CLEAR';
    }
    if (text.includes('equals') || text.includes('calculate') || text.includes('result')) {
      return 'EQUALS';
    }
    if (text.includes('backspace') || text.includes('delete') || text.includes('back')) {
      return 'BACKSPACE';
    }
    if (text.includes('decimal') || text.includes('point') || text.includes('dot')) {
      return '.';
    }

    // Replace number words with digits
    let processedText = text;
    Object.keys(numberWords).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      processedText = processedText.replace(regex, numberWords[word]);
    });

    // Replace operation words
    Object.keys(operations).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      processedText = processedText.replace(regex, operations[word]);
    });

    // Extract numbers and operations
    const tokens = processedText.match(/[\d\.]+|[+\-×÷]/g);
    if (tokens && tokens.length > 0) {
      return tokens.join('');
    }

    return null;
  };

  const startListening = useCallback((onResult?: (result: VoiceRecognitionResult) => void, onCommand?: (command: string) => void) => {
    const speechRecognition = getSpeechRecognition();
    
    if (!speechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    setError(null);
    setTranscript('');
    setIsListening(true);

    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-US';

    speechRecognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence || 0.5;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          const command = parseVoiceCommand(finalTranscript);
          
          if (onResult) {
            onResult({
              transcript: finalTranscript,
              confidence,
              isFinal: true
            });
          }
          
          if (command && onCommand) {
            onCommand(command);
          }
        } else {
          interimTranscript += transcript;
          if (onResult) {
            onResult({
              transcript: interimTranscript,
              confidence,
              isFinal: false
            });
          }
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    speechRecognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    speechRecognition.onend = () => {
      setIsListening(false);
    };

    try {
      speechRecognition.start();
    } catch (err) {
      setError('Failed to start speech recognition');
      setIsListening(false);
    }

    return () => {
      speechRecognition.stop();
    };
  }, [getSpeechRecognition, parseVoiceCommand]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    parseVoiceCommand
  };
};