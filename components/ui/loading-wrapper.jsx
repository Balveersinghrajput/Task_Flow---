"use client";

import { cn } from "@/lib/utils";
import { UniqueLoader } from "./unique-loader";

// Page loading wrapper
export const PageLoader = ({ 
  loading = false, 
  children, 
  className = "",
  text = "Loading page...",
  variant = "geometric"
}) => {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <UniqueLoader variant={variant} text={text} />
      </div>
    );
  }

  return children;
};

// Form loading wrapper
export const FormLoader = ({ 
  loading = false, 
  children, 
  className = "",
  text = "Processing...",
  variant = "particle"
}) => {
  if (loading) {
    return (
      <div className={cn("relative", className)}>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
          <UniqueLoader variant={variant} text={text} />
        </div>
      </div>
    );
  }

  return children;
};

// Card loading wrapper
export const CardLoader = ({ 
  loading = false, 
  children, 
  className = "",
  text = "Loading...",
  variant = "morphing"
}) => {
  if (loading) {
    return (
      <div className={cn("p-6 border rounded-lg", className)}>
        <div className="flex items-center justify-center h-32">
          <UniqueLoader variant={variant} text={text} />
        </div>
      </div>
    );
  }

  return children;
};

// Inline loading wrapper
export const InlineLoader = ({ 
  loading = false, 
  children, 
  className = "",
  text = "Loading...",
  variant = "gradient"
}) => {
  if (loading) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <UniqueLoader variant={variant} text={text} />
      </div>
    );
  }

  return children;
};

// Overlay loading wrapper
export const OverlayLoader = ({ 
  loading = false, 
  children, 
  className = "",
  text = "Loading...",
  variant = "dna"
}) => {
  if (loading) {
    return (
      <div className={cn("relative", className)}>
        {children}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <UniqueLoader variant={variant} text={text} />
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default PageLoader;
