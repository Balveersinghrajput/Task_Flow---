"use client";

import { cn } from "@/lib/utils";

// Unique geometric loading animation
export const GeometricLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
    <div className="relative">
      {/* Rotating squares */}
      <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-lg animate-spin"></div>
      <div className="absolute top-1 left-1 w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-lg animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
      <div className="absolute top-2 left-2 w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-lg animate-spin" style={{ animationDuration: "0.6s" }}></div>
    </div>
    <span className="text-sm font-medium text-gray-600 animate-pulse">{text}</span>
  </div>
);

// DNA helix loading animation
export const DNAHelixLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
    <div className="relative w-12 h-12">
      {/* DNA helix strands */}
      <div className="absolute left-1/2 top-0 w-1 h-12 bg-blue-600 rounded-full transform -translate-x-1/2 animate-pulse"></div>
      <div className="absolute left-1/2 top-0 w-1 h-12 bg-blue-400 rounded-full transform -translate-x-1/2 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      
      {/* Connecting lines */}
      <div className="absolute top-2 left-1/2 w-8 h-0.5 bg-blue-500 rounded-full transform -translate-x-1/2 rotate-12 animate-pulse"></div>
      <div className="absolute top-6 left-1/2 w-8 h-0.5 bg-blue-500 rounded-full transform -translate-x-1/2 -rotate-12 animate-pulse" style={{ animationDelay: "0.3s" }}></div>
      <div className="absolute top-10 left-1/2 w-8 h-0.5 bg-blue-500 rounded-full transform -translate-x-1/2 rotate-12 animate-pulse" style={{ animationDelay: "0.6s" }}></div>
    </div>
    <span className="text-sm font-medium text-gray-600 animate-pulse">{text}</span>
  </div>
);

// Particle system loading animation
export const ParticleLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
    <div className="relative w-16 h-16">
      {/* Central particle */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      
      {/* Orbiting particles */}
      <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 animate-spin" style={{ animationDuration: "2s" }}>
        <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }}>
        <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 animate-spin" style={{ animationDuration: "1.5s" }}>
        <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }}>
        <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
    <span className="text-sm font-medium text-gray-600 animate-pulse">{text}</span>
  </div>
);

// Morphing shape loader
export const MorphingLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-pulse"></div>
      <div className="absolute inset-2 border-4 border-blue-400 rounded-lg animate-pulse" style={{ animationDelay: "0.2s" }}></div>
      <div className="absolute inset-4 border-4 border-blue-300 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
      <div className="absolute inset-6 border-4 border-blue-200 rounded-lg animate-pulse" style={{ animationDelay: "0.6s" }}></div>
    </div>
    <span className="text-sm font-medium text-gray-600 animate-pulse">{text}</span>
  </div>
);

// Gradient wave loader
export const GradientWaveLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
    <div className="relative w-16 h-4">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse" style={{ animationDuration: "1.5s" }}></div>
    </div>
    <span className="text-sm font-medium text-gray-600 animate-pulse">{text}</span>
  </div>
);

// 3D rotating cube loader
export const Cube3DLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
    <div className="relative w-12 h-12 perspective-1000">
      <div className="absolute inset-0 transform-gpu animate-spin" style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 bg-blue-600 opacity-80 transform rotate-y-0"></div>
        <div className="absolute inset-0 bg-blue-500 opacity-80 transform rotate-y-90"></div>
        <div className="absolute inset-0 bg-blue-400 opacity-80 transform rotate-y-180"></div>
        <div className="absolute inset-0 bg-blue-300 opacity-80 transform rotate-y-270"></div>
      </div>
    </div>
    <span className="text-sm font-medium text-gray-600 animate-pulse">{text}</span>
  </div>
);

// Default unique loader (combines multiple effects)
export const UniqueLoader = ({ className = "", text = "Loading...", variant = "geometric" }) => {
  const loaders = {
    geometric: <GeometricLoader className={className} text={text} />,
    dna: <DNAHelixLoader className={className} text={text} />,
    particle: <ParticleLoader className={className} text={text} />,
    morphing: <MorphingLoader className={className} text={text} />,
    gradient: <GradientWaveLoader className={className} text={text} />,
    cube3d: <Cube3DLoader className={className} text={text} />
  };

  return loaders[variant] || loaders.geometric;
};

export default UniqueLoader;
