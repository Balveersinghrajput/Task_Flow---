import { getOrganization } from "@/actions/organization";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProjectList from "./_components/project-list";

export default async function OrganizationPage({ params }) {
  const { orgId } = await  params || {};
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  if (!orgId) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm p-12 shadow-xl text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 mb-6 shadow-lg">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                No Organization Selected
              </h2>
              <p className="text-gray-400 text-lg">
                Please select an organization to view its projects
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('OrganizationPage - orgId from params:', orgId);
  
  const organization = await getOrganization(orgId);
  console.log('OrganizationPage - organization:', organization);

  if (!organization) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-red-800/50 bg-gradient-to-br from-red-950/30 to-gray-950/50 backdrop-blur-sm p-12 shadow-xl text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-orange-600 mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Organization Not Found
              </h2>
              <p className="text-gray-400 text-lg mb-2">
                The organization you're looking for doesn't exist
              </p>
              <p className="text-sm text-gray-500 font-mono bg-gray-900/50 px-4 py-2 rounded-lg inline-block">
                ID: {orgId}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12">
        <div className="relative">
          {/* Decorative background */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Organizations</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-blue-400">{organization.name}</span>
            </div>

            {/* Organization Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                {/* Organization Avatar/Icon */}
                {organization.imageUrl ? (
                  <img 
                    src={organization.imageUrl} 
                    alt={organization.name}
                    className="w-16 h-16 rounded-xl border-2 border-gray-800 shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {organization.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Title */}
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold gradient-title leading-tight">
                    {organization.name}
                  </h1>
                  <p className="text-gray-400 mt-1">Project Management Dashboard</p>
                </div>
              </div>

              {/* Organization Stats */}
              <div className="flex gap-4">
                <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
                  <div className="text-sm text-gray-400">Projects</div>
                  <div className="text-2xl font-bold text-blue-400">—</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm">
                  <div className="text-sm text-gray-400">Active</div>
                  <div className="text-2xl font-bold text-green-400">—</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project List Section */}
      <div className="relative">
        <ProjectList orgId={organization.id} />
      </div>
    </div>
  );
}