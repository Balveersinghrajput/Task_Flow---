import { getProjects } from "@/actions/organization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardLoader } from "@/components/ui/loading-wrapper";
import Link from "next/link";
import { Suspense } from "react";
import DeleteProject from "./delete-project";

// Loading component for projects
function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0">
      {[1, 2, 3, 4].map((i) => (
        <CardLoader key={i} loading={true} text="Loading projects..." variant="geometric" />
      ))}
    </div>
  );
}

export default async function ProjectList({ orgId }) {
  console.log('ProjectList called with orgId:', orgId);
  
  return (
    <Suspense fallback={<ProjectListSkeleton />}>
      <ProjectListContent orgId={orgId} />
    </Suspense>
  );
}

async function ProjectListContent({ orgId }) {
  try {
    const projects = await getProjects(orgId);
    console.log('ProjectList received projects:', projects?.length, projects);

    if (!projects || projects.length === 0) {
      return (
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6 sm:p-8 lg:p-10 shadow-2xl mx-2 sm:mx-0">
          {/* Animated decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-48 sm:h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 text-center max-w-lg mx-auto">
            {/* Animated Icon */}
            <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            {/* Text content */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-2 sm:mb-3">
              No Projects Yet
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2 font-medium px-4">
              Organization: 
              <span className="block sm:inline font-mono text-xs sm:text-sm bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 mt-1 sm:mt-0 sm:ml-2 break-all">
                {orgId}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed px-4">
              Get started by creating your first project and bring your ideas to life
            </p>

            {/* CTA Button */}
            <Link
              href="/project/create"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-lg sm:rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 text-sm sm:text-base w-full sm:w-auto max-w-xs mx-auto"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Create New Project</span>
              <span className="sm:hidden">New Project</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Debug hint */}
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-4 sm:mt-6 italic flex items-center justify-center gap-1">
              <span className="animate-pulse">💡</span> Check browser console for details
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            className="group relative overflow-hidden border-2 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/50"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Project number badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
              {index + 1}
            </div>

            <CardHeader className="relative z-10 pb-3 sm:pb-4">
              <CardTitle className="flex justify-between items-start gap-2 sm:gap-3 pr-10 sm:pr-12">
                <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 break-words line-clamp-2">
                  {project.name}
                </span>
                <DeleteProject projectId={project.id} orgId={orgId} />
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-0">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {project.description || "No description available"}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <Link
                  href={`/project/${project.id}`}
                  className="group/link inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-colors duration-200 text-sm sm:text-base"
                >
                  View Project
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                {/* Project key badge */}
                {project.key && (
                  <span className="px-2 sm:px-3 py-1 text-xs font-mono font-bold bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 self-start sm:self-auto">
                    {project.key}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-gray-900 p-4 sm:p-6 shadow-xl mx-2 sm:mx-0">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-red-900 dark:text-red-400 text-base sm:text-lg mb-1">Error loading projects</p>
            <p className="text-xs sm:text-sm text-red-700 dark:text-red-500 mb-2 font-medium break-words">{error.message}</p>
            {error.message.includes("not a member") && (
              <div className="flex items-start gap-2 mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                <span className="text-base sm:text-lg flex-shrink-0">💡</span>
                <p className="text-xs text-red-800 dark:text-red-400 leading-relaxed">
                  Make sure you are a member of this organization. Contact your administrator if you need access.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
