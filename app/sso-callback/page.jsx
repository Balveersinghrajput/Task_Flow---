// app/sso-callback/page.jsx
'use client';

import { useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
      } catch (error) {
        console.error('SSO callback error:', error);
        // Redirect to sign-in page on error
        window.location.href = '/sign-in';
      }
    };

    handleCallback();
  }, [handleRedirectCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-2">
          Completing Sign In...
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Please wait while we redirect you
        </p>

        {/* Decorative Elements */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}