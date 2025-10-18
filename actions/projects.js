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
    // Check if project key already exists in this organization
    const existingProject = await db.project.findFirst({
      where: {
        key: data.key,
        organizationId: orgId,
      },
    });

    if (existingProject) {
      throw new Error(`Project key "${data.key}" already exists in this organization. Please choose a different key.`);
    }

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
      throw new Error(`Project key "${data.key}" already exists in this organization. Please choose a different key.`);
    }
    // Re-throw our custom error messages
    if (error.message.includes("already exists")) {
      throw error;
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

// ✅ Check if project key is available
export async function checkProjectKeyAvailability(key, orgId) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingProject = await db.project.findFirst({
      where: {
        key: key,
        organizationId: orgId,
      },
    });

    return !existingProject; // true if available, false if taken
  } catch (error) {
    console.error("Error checking project key availability:", error);
    return false;
  }
}

// ✅ Get project by ID
export async function getProject(projectId) {
  const { userId, orgId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        sprints: {
          orderBy: { createdAt: 'desc' }
        },
      },
    });

    if (!project) {
      console.log(`Project not found: ${projectId}`);
      return null;
    }

    // Check if user has access to this project through organization
    if (orgId && project.organizationId !== orgId) {
      console.log(`User orgId (${orgId}) doesn't match project orgId (${project.organizationId})`);
      return null;
    }

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
