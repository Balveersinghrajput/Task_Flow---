"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

// ✅ Create a new project
export async function createProject(data) {
  const { userId, orgId: activeOrgId } = auth();
  const orgId = data.orgId || activeOrgId;

  if (!userId) throw new Error("Unauthorized");

  if (!orgId) {
    throw new Error("No Organization Selected. Please select an organization first.");
  }

  // Get organization membership list
  const membershipList = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  const userMembership = membershipList.data.find(
    (member) => member.publicUserData.userId === userId
  );

  if (!userMembership || (userMembership.role !== "admin" && userMembership.role !== "org:admin")) {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });
    return project;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Project key already exists in this organization.");
    }
    throw new Error("Error creating project: " + error.message);
  }
}

// ✅ Delete project
export async function deleteProject(projectId) {
  const { userId, orgId: activeOrgId } = auth();

  if (!userId || !activeOrgId) {
    throw new Error("Unauthorized");
  }

  const membershipList = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: activeOrgId,
  });

  const userMembership = membershipList.data.find(
    (member) => member.publicUserData.userId === userId
  );

  if (!userMembership || (userMembership.role !== "admin" && userMembership.role !== "org:admin")) {
    throw new Error("Only organization admins can delete projects");
  }

  const project = await db.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.organizationId !== activeOrgId) {
    throw new Error("Project not found or permission denied");
  }

  await db.project.delete({
    where: { id: projectId },
  });

  return { success: true };
}

// ✅ Get project by ID
export async function getProject(projectId) {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        sprints: true, // include sprints for your SprintBoard
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
