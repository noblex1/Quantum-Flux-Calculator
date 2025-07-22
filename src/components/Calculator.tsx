import { useState, useEffect, useCallback } from 'react';
import { CalcButton } from './CalcButton';
import { Display } from './Display';
import { VoiceInput } from './VoiceInput';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || '0';
      const result = calculate(parseFloat(currentValue), inputValue, operation);
      
      setDisplay(String(result));
      setPreviousValue(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(parseFloat(previousValue), inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const addDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  // Voice command handler
  const handleVoiceCommand = useCallback((command: string) => {
    console.log('Processing voice command:', command);
    
    if (command === 'clear') {
      clearAll();
    } else if (command === 'equals') {
      performCalculation();
    } else if (command === 'backspace') {
      backspace();
    } else if (command.startsWith('number:')) {
      const number = command.split(':')[1];
      if (number === '.') {
        addDecimal();
      } else {
        inputNumber(number);
      }
    } else if (command.startsWith('operation:')) {
      const operation = command.split(':')[1];
      inputOperation(operation);
    }
  }, [inputNumber, inputOperation, performCalculation, clearAll, backspace, addDecimal]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      
      if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
      } else if (e.key === '+') {
        inputOperation('+');
      } else if (e.key === '-') {
        inputOperation('-');
      } else if (e.key === '*') {
        inputOperation('×');
      } else if (e.key === '/') {
        inputOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        performCalculation();
      } else if (e.key === 'Escape') {
        clearAll();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key === '.') {
        addDecimal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputNumber, inputOperation, performCalculation]);

  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 blur-3xl animate-float"></div>
      
      <div className="relative backdrop-blur-glass bg-gradient-glass border border-glass-border rounded-2xl p-6 shadow-glass">
        {/* Calculator Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-neon-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
          </div>
          <div className="text-neon-cyan font-mono text-sm tracking-widest">
            CALC-2077
          </div>
        </div>

        {/* Display */}
        <Display value={display} operation={operation} />

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {/* Row 1 */}
          <CalcButton
            onClick={clearAll}
            variant="secondary"
            className="col-span-2"
          >
            CLEAR
          </CalcButton>
          <CalcButton onClick={backspace} variant="secondary">
            ⌫
          </CalcButton>
          <CalcButton onClick={() => inputOperation('÷')} variant="operator">
            ÷
          </CalcButton>

          {/* Row 2 */}
          <CalcButton onClick={() => inputNumber('7')} variant="number">
            7
          </CalcButton>
          <CalcButton onClick={() => inputNumber('8')} variant="number">
            8
          </CalcButton>
          <CalcButton onClick={() => inputNumber('9')} variant="number">
            9
          </CalcButton>
          <CalcButton onClick={() => inputOperation('×')} variant="operator">
            ×
          </CalcButton>

          {/* Row 3 */}
          <CalcButton onClick={() => inputNumber('4')} variant="number">
            4
          </CalcButton>
          <CalcButton onClick={() => inputNumber('5')} variant="number">
            5
          </CalcButton>
          <CalcButton onClick={() => inputNumber('6')} variant="number">
            6
          </CalcButton>
          <CalcButton onClick={() => inputOperation('-')} variant="operator">
            -
          </CalcButton>

          {/* Row 4 */}
          <CalcButton onClick={() => inputNumber('1')} variant="number">
            1
          </CalcButton>
          <CalcButton onClick={() => inputNumber('2')} variant="number">
            2
          </CalcButton>
          <CalcButton onClick={() => inputNumber('3')} variant="number">
            3
          </CalcButton>
          <CalcButton onClick={() => inputOperation('+')} variant="operator">
            +
          </CalcButton>

          {/* Row 5 */}
          <CalcButton
            onClick={() => inputNumber('0')}
            variant="number"
            className="col-span-2"
          >
            0
          </CalcButton>
          <CalcButton onClick={addDecimal} variant="number">
            .
          </CalcButton>
          <CalcButton onClick={performCalculation} variant="equals">
            =
          </CalcButton>
        </div>

        {/* Voice Input Section */}
        <div className="mt-6 border-t border-glass-border/30 pt-6">
          <VoiceInput onCommand={handleVoiceCommand} />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-muted-foreground text-xs font-mono">
          Quantum Computing Interface v2.1 • Voice Enabled
        </div>
      </div>
    </div>
  );
};

export default Calculator;