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
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-yellow-800">
            No projects found for organization: {orgId}
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Check the browser console for debug information.
          </p>
          <Link
            className="underline underline-offset-2 text-blue-200 mt-2 inline-block"
            href="/project/create"
          >
            Create New Project
          </Link>
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