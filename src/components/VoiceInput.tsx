import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onCommand: (command: string) => void;
  className?: string;
}

export const VoiceInput = ({ onCommand, className }: VoiceInputProps) => {
  const { isListening, isSupported, transcript, error, startListening, stopListening } = useVoiceRecognition();
  const [lastTranscript, setLastTranscript] = useState('');

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    
    if (command === 'CLEAR') {
      onCommand('clear');
    } else if (command === 'EQUALS') {
      onCommand('equals');
    } else if (command === 'BACKSPACE') {
      onCommand('backspace');
    } else {
      // Process each character/operation in the command
      for (const char of command) {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(char)) {
          onCommand(`number:${char}`);
        } else if (['+', '-', '×', '÷'].includes(char)) {
          onCommand(`operation:${char}`);
        }
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(
        (result) => {
          if (result.isFinal) {
            setLastTranscript(result.transcript);
          }
        },
        handleVoiceCommand
      );
    }
  };

  useEffect(() => {
    if (transcript && transcript !== lastTranscript) {
      setLastTranscript(transcript);
    }
  }, [transcript, lastTranscript]);

  if (!isSupported) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Voice button */}
      <Button
        onClick={toggleListening}
        variant={isListening ? "destructive" : "secondary"}
        size="lg"
        className={cn(
          'w-full relative overflow-hidden transition-all duration-300',
          isListening 
            ? 'bg-gradient-to-r from-destructive/80 to-accent/80 animate-pulse shadow-purple' 
            : 'bg-glass-bg/60 hover:bg-glass-bg/80 border border-glass-border/50 hover:border-neon-cyan/50'
        )}
      >
        <div className="flex items-center gap-3">
          {isListening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
          <span className="font-mono">
            {isListening ? 'LISTENING...' : 'VOICE INPUT'}
          </span>
        </div>
        
        {/* Pulse animation when listening */}
        {isListening && (
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 animate-pulse"></div>
        )}
      </Button>

      {/* Status display */}
      <div className="text-center space-y-2">
        {isListening && (
          <div className="text-xs text-neon-cyan font-mono tracking-widest animate-pulse">
            🎤 SAY YOUR CALCULATION
          </div>
        )}
        
        {transcript && (
          <div className="p-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg backdrop-blur-sm">
            <div className="text-xs text-muted-foreground font-mono mb-1">TRANSCRIPT:</div>
            <div className="text-sm text-neon-cyan font-mono">{transcript}</div>
          </div>
        )}
        
        {error && (
          <div className="text-xs text-destructive font-mono">{error}</div>
        )}
      </div>

      {/* Voice commands help */}
      <div className="text-xs text-muted-foreground font-mono space-y-1">
        <div className="text-center text-neon-cyan">VOICE COMMANDS:</div>
        <div className="grid grid-cols-2 gap-1 text-[10px]">
          <div>"five plus three"</div>
          <div>"clear"</div>
          <div>"twenty minus two"</div>
          <div>"equals"</div>
          <div>"multiply by four"</div>
          <div>"backspace"</div>
          <div>"divide by two"</div>
          <div>"decimal point"</div>
        </div>
      </div>
    </div>
  );
};