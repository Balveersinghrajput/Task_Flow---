import { getProjects } from "@/actions/organization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardLoader } from "@/components/ui/loading-wrapper";
import Link from "next/link";
import { Suspense } from "react";
import DeleteProject from "./delete-project";

// Loading component for projects
function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900 p-8 shadow-lg">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
  
  <div className="relative z-10 text-center max-w-md mx-auto">
    {/* Icon */}
    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>

    {/* Text content */}
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
      No Projects Yet
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-1">
      Organization: <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{orgId}</span>
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
      Get started by creating your first project
    </p>

    {/* CTA Button */}
    <Link
      href="/project/create"
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Create New Project
    </Link>

    {/* Debug hint */}
    <p className="text-xs text-gray-400 dark:text-gray-600 mt-4 italic">
      💡 Check browser console for details
    </p>
  </div>
</div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {project.name}
                {/* ✅ Pass both projectId and orgId */}
                <DeleteProject projectId={project.id} orgId={orgId} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{project.description}</p>
              <Link
                href={`/project/${project.id}`}
                className="text-blue-500 hover:underline"
              >
                View Project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="font-semibold">Error loading projects:</p>
        <p className="text-sm">{error.message}</p>
        {error.message.includes("not a member") && (
          <p className="text-xs mt-1 text-red-600">
            💡 Make sure you are a member of this organization
          </p>
        )}
      </div>
    );
  }
}