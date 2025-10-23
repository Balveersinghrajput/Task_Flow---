"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getIssuesForSprint(sprintId) {
  const { userId, orgId } = await auth(); // ✅ Already correct

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get the sprint to verify access and get project info
  const sprint = await db.sprint.findUnique({
    where: { id: sprintId },
    include: { project: true },
  });

  if (!sprint) {
    throw new Error("Sprint not found");
  }

  // If user has an active orgId, verify it matches the project's organization
  if (orgId && sprint.project.organizationId !== orgId) {
    throw new Error("Unauthorized - organization mismatch");
  }

  const issues = await db.issue.findMany({
    where: { sprintId: sprintId },
    orderBy: [{ status: "asc" }, { order: "asc" }],
    include: {
      assignee: true,
      reporter: true,
      sprint: true,
    },
  });

  return issues;
}

export async function createIssue(projectId, data) {
  const { userId, orgId } = await auth(); // ✅ Add await

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Get the project to verify access and get organization info
  const project = await db.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  // If user has an active orgId, verify it matches the project's organization
  if (orgId && project.organizationId !== orgId) {
    throw new Error("Unauthorized - organization mismatch");
  }

  let user = await db.user.findUnique({ where: { clerkUserId: userId } });

  const lastIssue = await db.issue.findFirst({
    where: { projectId, status: data.status },
    orderBy: { order: "desc" },
  });

  const newOrder = lastIssue ? lastIssue.order + 1 : 0;

  const issue = await db.issue.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      projectId: projectId,
      sprintId: data.sprintId,
      reporterId: user.id,
      assigneeId: data.assigneeId || null,
      order: newOrder,
    },
    include: {
      assignee: true,
      reporter: true,
    },
  });

  return issue;
}

export async function updateIssueOrder(updatedIssues) {
  const { userId, orgId } = await auth(); // ✅ Add await

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // For issue order updates, we need to verify access through the first issue
  if (updatedIssues.length > 0) {
    const firstIssue = await db.issue.findUnique({
      where: { id: updatedIssues[0].id },
      include: { 
        sprint: { 
          include: { project: true } 
        } 
      },
    });

    if (!firstIssue) {
      throw new Error("Issue not found");
    }

    // If user has an active orgId, verify it matches the project's organization
    if (orgId && firstIssue.sprint.project.organizationId !== orgId) {
      throw new Error("Unauthorized - organization mismatch");
    }
  }

  // Start a transaction
  await db.$transaction(async (prisma) => {
    // Update each issue
    for (const issue of updatedIssues) {
      await prisma.issue.update({
        where: { id: issue.id },
        data: {
          status: issue.status,
          order: issue.order,
        },
      });
    }
  });

  return { success: true };
}

export async function deleteIssue(issueId) {
  const { userId, orgId } = await auth(); // ✅ Add await

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const issue = await db.issue.findUnique({
    where: { id: issueId },
    include: { 
      project: true,
      sprint: {
        include: { project: true }
      }
    },
  });

  if (!issue) {
    throw new Error("Issue not found");
  }

  // If user has an active orgId, verify it matches the project's organization
  if (orgId && issue.project.organizationId !== orgId) {
    throw new Error("Unauthorized - organization mismatch");
  }

  if (
    issue.reporterId !== user.id &&
    !issue.project.adminIds.includes(user.id)
  ) {
    throw new Error("You don't have permission to delete this issue");
  }

  await db.issue.delete({ where: { id: issueId } });

  return { success: true };
}

export async function updateIssue(issueId, data) {
  const { userId, orgId } = await auth(); // ✅ Add await

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const issue = await db.issue.findUnique({
      where: { id: issueId },
      include: { 
        project: true,
        sprint: {
          include: { project: true }
        }
      },
    });

    if (!issue) {
      throw new Error("Issue not found");
    }

    // If user has an active orgId, verify it matches the project's organization
    if (orgId && issue.project.organizationId !== orgId) {
      throw new Error("Unauthorized - organization mismatch");
    }

    const updatedIssue = await db.issue.update({
      where: { id: issueId },
      data: {
        status: data.status,
        priority: data.priority,
      },
      include: {
        assignee: true,
        reporter: true,
      },
    });

    return updatedIssue;
  } catch (error) {
    throw new Error("Error updating issue: " + error.message);
  }
}