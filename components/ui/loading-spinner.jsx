"use client";

import { cn } from "@/lib/utils";

const LoadingSpinner = ({ 
  size = "md", 
  variant = "default", 
  className = "",
  text = "Loading...",
  showText = true 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const variantClasses = {
    default: "text-blue-600",
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    white: "text-white"
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={cn(
            "animate-spin rounded-full border-2 border-gray-200",
            sizeClasses[size]
          )}
        />
        {/* Inner spinning ring */}
        <div 
          className={cn(
            "absolute top-0 left-0 animate-spin rounded-full border-2 border-transparent border-t-current",
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
        {/* Center dot */}
        <div 
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-current",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-1.5 h-1.5" : "w-2 h-2",
            variantClasses[variant]
          )}
        />
      </div>
      {showText && (
        <span className={cn("text-sm font-medium", variantClasses[variant])}>
          {text}
        </span>
      )}
    </div>
  );
};

// Pulse loading animation
export const PulseLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex items-center justify-center gap-2", className)}>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
    </div>
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

// Bounce loading animation
export const BounceLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex items-center justify-center gap-2", className)}>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
    </div>
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

// Wave loading animation
export const WaveLoader = ({ className = "", text = "Loading..." }) => (
  <div className={cn("flex items-center justify-center gap-2", className)}>
    <div className="flex space-x-1">
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
    </div>
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

// Full page loading overlay
export const FullPageLoader = ({ text = "Loading..." }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-xl">
      <LoadingSpinner size="lg" text={text} />
    </div>
  </div>
);

// Button loading state
export const ButtonLoader = ({ loading, children, ...props }) => (
  <button 
    {...props}
    disabled={loading}
    className={cn(
      "relative",
      loading && "cursor-not-allowed opacity-70",
      props.className
    )}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="sm" variant="white" showText={false} />
      </div>
    )}
    <span className={cn(loading && "opacity-0")}>
      {children}
    </span>
  </button>
);

export default LoadingSpinner;
