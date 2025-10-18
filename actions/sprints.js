"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createSprint(projectId, data) {
  const { userId, orgId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get the project to verify access and get organization info
  const project = await db.project.findUnique({
    where: { id: projectId },
    include: { sprints: { orderBy: { createdAt: "desc" } } },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  // If user has an active orgId, verify it matches the project's organization
  if (orgId && project.organizationId !== orgId) {
    throw new Error("Unauthorized - organization mismatch");
  }

  // If no active orgId, we'll allow access since the middleware handles project page access
  // The project itself contains the organization information
  console.log(`Creating sprint for project ${projectId} in organization ${project.organizationId}`);

  const sprint = await db.sprint.create({
    data: {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "PLANNED",
      projectId: projectId,
    },
  });

  return sprint;
}

export async function updateSprintStatus(sprintId, newStatus) {
  const { userId, orgId, orgRole } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const sprint = await db.sprint.findUnique({
      where: { id: sprintId },
      include: { project: true },
    });
    console.log(sprint, orgRole);

    if (!sprint) {
      throw new Error("Sprint not found");
    }

    // If user has an active orgId, verify it matches the project's organization
    if (orgId && sprint.project.organizationId !== orgId) {
      throw new Error("Unauthorized - organization mismatch");
    }

    // Get the organization ID from the project
    const projectOrgId = sprint.project.organizationId;
    
    // If no active orgId, we need to check user's role in the project's organization
    let userRole = orgRole;
    if (!orgId) {
      // Get user's membership in the project's organization
      const membershipList = await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: projectOrgId,
      });

      const userMembership = membershipList.data.find(
        (member) => member.publicUserData.userId === userId
      );

      if (!userMembership) {
        throw new Error("You don't have access to this organization");
      }

      userRole = userMembership.role;
    }

    // Check if user has admin role
    if (userRole !== "org:admin" && userRole !== "admin") {
      throw new Error("Only organization admins can update sprint status");
    }

    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);

    if (newStatus === "ACTIVE" && (now < startDate || now > endDate)) {
      throw new Error("Cannot start sprint outside of its date range");
    }

    if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
      throw new Error("Can only complete an active sprint");
    }

    const updatedSprint = await db.sprint.update({
      where: { id: sprintId },
      data: { status: newStatus },
    });

    return { success: true, sprint: updatedSprint };
  } catch (error) {
    throw new Error(error.message);
  }
}
