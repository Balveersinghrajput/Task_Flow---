import { getOrganization } from "@/actions/organization";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProjectList from "./_components/project-list";

export default async function OrganizationPage({ params }) {
  const { orgId } = params || {};
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  if (!orgId) {
    return (
      <div className="text-center text-xl mt-10">
        No Organization Selected
      </div>
    );
  }

  console.log('OrganizationPage - orgId from params:', orgId);
  
  const organization = await getOrganization(orgId);
  console.log('OrganizationPage - organization:', organization);

  if (!organization) {
    return (
      <div className="text-center text-xl mt-10">
        Organization not found for ID: {orgId}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&rsquo;s Projects
        </h1>
      </div>
      <div className="mb-4">
        <ProjectList orgId={organization.id} />
      </div>
    </div>
  );
}
