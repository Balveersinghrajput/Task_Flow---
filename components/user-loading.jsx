"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const UserLoading = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoaded && isUserLoaded) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isUserLoaded]);

  if (!show) {
    return null;
  }

  return (
    <div 
      className={`flex items-center justify-center gap-3 py-4 transition-all duration-400 ease-out ${
        fadeOut 
          ? 'opacity-0 scale-95 translate-y-[-10px]' 
          : 'opacity-100 scale-100 translate-y-0'
      }`}
    >
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Loading user data...
      </span>
    </div>
  );
};

export default UserLoading;