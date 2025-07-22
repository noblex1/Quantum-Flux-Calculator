import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-neon-cyan rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-neon-purple rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-pink rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 font-mono tracking-tight">
            QUANTUM CALC
          </h1>
          <p className="text-lg text-muted-foreground font-mono tracking-widest">
            NEURAL COMPUTING INTERFACE
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-0.5 bg-neon-cyan animate-pulse"></div>
            <span className="text-xs text-neon-cyan font-mono">ONLINE</span>
            <div className="w-2 h-0.5 bg-neon-cyan animate-pulse"></div>
          </div>
        </div>

        {/* Calculator */}
        <div className="w-full max-w-md">
          <Calculator />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono tracking-widest">
            POWERED BY CYBERPUNK TECHNOLOGY
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-xs text-neon-cyan">SECURE</span>
            <div className="w-1 h-1 bg-neon-cyan rounded-full"></div>
            <span className="text-xs text-neon-purple">ENCRYPTED</span>
            <div className="w-1 h-1 bg-neon-purple rounded-full"></div>
            <span className="text-xs text-neon-pink">QUANTUM</span>
          </div>
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-cyan opacity-60"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-cyan opacity-60"></div>
    </div>
  );
};

export default Index;
