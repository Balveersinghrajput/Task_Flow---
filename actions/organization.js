"use server";

import { db } from "@/lib/prisma";
import { ultraSerialize } from "@/lib/serialization";
import { auth, clerkClient } from "@clerk/nextjs/server";

// Get organization by ID and check if user is a member
export async function getOrganization(orgId) {
  const { userId } = await auth(); // ✅ Added await
  if (!userId) throw new Error("Unauthorized");

  console.log('getOrganization called with orgId:', orgId, 'userId:', userId);

  const organization = await clerkClient.organizations.getOrganization({
    organizationId: orgId,
  });

  if (!organization) return null;

  return ultraSerialize({
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    imageUrl: organization.imageUrl,
    createdAt: organization.createdAt,
    updatedAt: organization.updatedAt,
  });
}

// Get all projects for an organization
export async function getProjects(orgId) {
  const { userId } = await auth(); // ✅ Added await
  if (!userId) throw new Error("Unauthorized");

  console.log('getProjects called with orgId:', orgId, 'userId:', userId);

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const allProjects = await db.project.findMany();
  console.log('Total projects in database:', allProjects.length);
  
  const projects = await db.project.findMany({
    where: { organizationId: orgId },
    orderBy: { createdAt: "desc" },
  });

  console.log('Found projects for orgId', orgId, ':', projects.length);
  console.log('Projects data:', projects);

  const allOrgs = await db.project.findMany({
    select: { organizationId: true },
    distinct: ['organizationId']
  });
  console.log('All organization IDs in projects:', allOrgs.map(p => p.organizationId));

  return ultraSerialize(projects);
}

// Get issues assigned to or reported by a user
export async function getUserIssues(userId) {
  const { orgId } = await auth(); // ✅ Added await
  if (!userId || !orgId) throw new Error("No user id or organization id found");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const issues = await db.issue.findMany({
    where: {
      OR: [{ assigneeId: user.id }, { reporterId: user.id }],
      project: { organizationId: orgId },
    },
    include: {
      project: true,
      assignee: true,
      reporter: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return ultraSerialize(issues);
}

// Get all users in an organization
export async function getOrganizationUsers(orgId) {
  const { userId } = await auth(); // ✅ Added await
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const organizationMemberships =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userIds = organizationMemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  const users = await db.user.findMany({
    where: { clerkUserId: { in: userIds } },
  });

  return ultraSerialize(users);
}