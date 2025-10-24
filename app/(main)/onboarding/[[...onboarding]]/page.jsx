// app/[main]/onboarding/[...onboarding]/page.jsx
"use client";

import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Onboarding = () => {
  const { organization } = useOrganization();
  const router = useRouter();

  useEffect(() => {
    if (organization) {
      router.push(`/organization/${organization.id}`);
    }
  }, [organization, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-16">
      <div className="w-full max-w-[95%] xs:max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center mb-3 xs:mb-4 sm:mb-5 md:mb-6">
            <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-lg transition-transform duration-300 hover:scale-110">
              <svg 
                className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-slate-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>
          </div>

          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 px-2 leading-tight">
            Welcome to Task-Flow
          </h1>
          
          <p className="text-slate-400 text-xs xs:text-sm sm:text-base md:text-lg max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-3 xs:px-4 leading-relaxed">
            Create a new organization or join an existing one to start collaborating
          </p>
        </div>

        {/* Organization List Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 shadow-xl mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 overflow-hidden">
          <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8">
            <OrganizationList
              hidePersonal
              afterCreateOrganizationUrl={(org) => `/organization/${org.id}`}
              afterSelectOrganizationUrl={(org) => `/organization/${org.id}`}
            />
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-3.5 md:gap-4 lg:gap-5">
          {/* Create Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 shadow-lg transition-all duration-300 hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-xl hover:scale-[1.02] active:scale-100">
            <div className="p-3 xs:p-3.5 sm:p-4 md:p-4.5 lg:p-5">
              <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3.5">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 transition-transform duration-300 group-hover:scale-110">
                  <svg 
                    className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-slate-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4v16m8-8H4" 
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-200 text-xs xs:text-sm sm:text-sm md:text-base mb-0.5 xs:mb-1">
                    Create
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-slate-400 leading-snug">
                    Start a new organization
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 shadow-lg transition-all duration-300 hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-xl hover:scale-[1.02] active:scale-100">
            <div className="p-3 xs:p-3.5 sm:p-4 md:p-4.5 lg:p-5">
              <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3.5">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 transition-transform duration-300 group-hover:scale-110">
                  <svg 
                    className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-slate-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-200 text-xs xs:text-sm sm:text-sm md:text-base mb-0.5 xs:mb-1">
                    Join
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-slate-400 leading-snug">
                    Join an existing team
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborate Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-800 shadow-lg transition-all duration-300 hover:bg-slate-900/70 hover:border-slate-700 hover:shadow-xl hover:scale-[1.02] active:scale-100">
            <div className="p-3 xs:p-3.5 sm:p-4 md:p-4.5 lg:p-5">
              <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-3.5">
                <div className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 transition-transform duration-300 group-hover:scale-110">
                  <svg 
                    className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-slate-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-200 text-xs xs:text-sm sm:text-sm md:text-base mb-0.5 xs:mb-1">
                    Collaborate
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-xs md:text-sm text-slate-400 leading-snug">
                    Work together seamlessly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;