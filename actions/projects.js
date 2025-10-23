"use server";

import { db } from "@/lib/prisma";
import { ultraSerialize } from "@/lib/serialization";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

// ✅ Create a new project
export async function createProject(data) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  const userId = user.id;
  const activeOrgId = user.publicMetadata?.organizationId || user.organizationMemberships?.[0]?.organization?.id;
  const orgId = data.orgId || activeOrgId;

  if (!orgId) {
    throw new Error("No Organization Selected. Please select an organization first.");
  }

  // Get organization membership list
  const client = await clerkClient();
  const membershipList = await client.organizations.getOrganizationMembershipList({
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

    return ultraSerialize(project);
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error(`Project key "${data.key}" already exists in this organization. Please choose a different key.`);
    }
    // Re-throw custom error messages
    if (error.message.includes("already exists")) {
      throw error;
    }
    throw new Error("Error creating project: " + error.message);
  }
}

// ✅ Delete project - NOW ACCEPTS orgId as parameter
export async function deleteProject(projectId, orgId) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized: User not authenticated");
    }

    const userId = user.id;

    console.log("=== DELETE PROJECT DEBUG ===");
    console.log("User ID:", userId);
    console.log("Org ID (from client):", orgId);
    console.log("Project ID:", projectId);
    console.log("===========================");

    if (!orgId) {
      throw new Error("Unauthorized: No organization context provided");
    }

    // Verify user is a member of the organization
    const client = await clerkClient();
    const membershipList = await client.organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

    const userMembership = membershipList.data.find(
      (member) => member.publicUserData.userId === userId
    );

    if (!userMembership) {
      throw new Error("You are not a member of this organization");
    }

    if (userMembership.role !== "org:admin") {
      throw new Error("Only organization admins can delete projects");
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.organizationId !== orgId) {
      throw new Error("You don't have permission to delete this project");
    }

    await db.project.delete({
      where: { id: projectId },
    });

    console.log("✅ Project deleted successfully:", projectId);

    return { success: true };
  } catch (error) {
    console.error("❌ Delete project error:", error.message);
    throw error;
  }
}

// ✅ Check if project key is available
export async function checkProjectKeyAvailability(key, orgId) {
  const user = await currentUser();

  if (!user) {
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
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userId = user.id;
  const orgId = user.publicMetadata?.organizationId || user.organizationMemberships?.[0]?.organization?.id;

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

    return ultraSerialize(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}