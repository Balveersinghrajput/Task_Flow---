import { getProject } from "@/actions/projects";
import { serializeDates } from "@/lib/serialization";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";

export default async function ProjectPage({ params }) {
  const { projectId } = params;
  
  console.log("ProjectPage loading for projectId:", projectId);
  
  if (!projectId) {
    console.log("No projectId provided, redirecting to not found");
    notFound();
  }

  console.log("Fetching project data...");
  const project = await getProject(projectId);
  console.log("Project data received:", project);

  if (!project) {
    console.log("Project not found, redirecting to not found");
    notFound();
  }

  console.log("Rendering project page for:", project.name);

  return (
    <div className="container mx-auto">
      <Suspense fallback={<BarLoader width="100%" color="#36d7b7" />}>
        <SprintCreationForm
          projectTitle={project.name}
          projectId={projectId}
          projectKey={project.key}
          sprintKey={project.sprints?.length + 1}
        />

        {project.sprints && project.sprints.length > 0 ? (
          <SprintBoard
            sprints={serializeDates(project.sprints)}
            projectId={projectId}
            orgId={project.organizationId}
          />
        ) : (
          <div className="text-center mt-8 text-gray-500">
            Create a Sprint from button above
          </div>
        )}
      </Suspense>
    </div>
  );
}
