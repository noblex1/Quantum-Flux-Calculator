import { cn } from '@/lib/utils';

interface DisplayProps {
  value: string;
  operation?: string | null;
  className?: string;
}

export const Display = ({ value, operation, className }: DisplayProps) => {
  const formatValue = (val: string) => {
    // Format large numbers with commas
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    
    // Handle very large or very small numbers
    if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // Format with commas for readability
    const formatted = num.toLocaleString('en-US', {
      maximumFractionDigits: 8,
      useGrouping: true
    });
    
    return formatted;
  };

  return (
    <div
      className={cn(
        'relative backdrop-blur-sm bg-glass-bg/30 border border-glass-border/30 rounded-xl p-6 min-h-[120px]',
        'shadow-inner overflow-hidden',
        className
      )}
    >
      {/* Scanning line effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="relative z-10">
        {/* Operation indicator */}
        {operation && (
          <div className="flex items-center justify-end mb-2">
            <span className="text-neon-purple text-sm font-mono tracking-widest">
              OP: {operation}
            </span>
            <div className="ml-2 w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* Main display */}
        <div className="text-right">
          <div
            className="font-mono text-3xl md:text-4xl lg:text-5xl text-neon-cyan leading-none tracking-tight font-light"
            style={{
              textShadow: '0 0 20px hsl(var(--neon-cyan) / 0.8), 0 0 40px hsl(var(--neon-cyan) / 0.4)',
              filter: 'drop-shadow(0 0 10px hsl(var(--neon-cyan) / 0.6))'
            }}
          >
            {formatValue(value)}
          </div>
          
          {/* Cursor blink */}
          <div className="flex justify-end mt-2">
            <div className="w-3 h-0.5 bg-neon-cyan animate-pulse"></div>
          </div>
        </div>
        
        {/* Status bar */}
        <div className="flex items-center justify-between mt-4 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse"></div>
            READY
          </span>
          <span className="text-neon-cyan/60">
            {value.length > 10 ? 'OVERFLOW' : 'NORMAL'}
          </span>
        </div>
      </div>
      
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};