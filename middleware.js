import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protected routes that require a signed-in user
const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organization(.*)",
  "/project(.*)",
  "/issue(.*)",
  "/sprint(.*)",
]);

// Paths allowed without an organization
const allowedWithoutOrg = [
  "/",              // home
  "/onboarding",    // onboarding
  "/project/create",
  "/project/[projectId]",
  "/organization/[orgId]"  // Allow access to organization pages
];

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  const { userId, orgId, orgRole, redirectToSignIn } = await auth();

  // Minimal logging for performance
  if (process.env.NODE_ENV === 'development') {
    console.log(`Middleware: ${pathname} - userId: ${userId}, orgId: ${orgId}, orgRole: ${orgRole}`);
  }

  // 1️⃣ Redirect to sign-in if user not signed in and trying to access a protected route
  if (!userId && isProtectedRoute(req)) {
    console.log("Redirecting to sign-in");
    return redirectToSignIn();
  }

  // 2️⃣ Check if this is a project page (e.g., /project/abc123)
  const isProjectPage = /^\/project\/[^\/]+$/.test(pathname);
  console.log(`Is project page: ${isProjectPage}`);
 
  // 2️⃣ Check if this is an organization page (e.g., /organization/abc123)
  const isOrganizationPage = /^\/organization\/[^\/]+$/.test(pathname);
  console.log(`Is organization page: ${isOrganizationPage}`);

  // 3️⃣ Redirect signed-in users without an orgId to onboarding,
  // unless the path is in allowedWithoutOrg OR it's a project page OR organization page
  if (
    userId &&
    !orgId &&
    !allowedWithoutOrg.includes(pathname) &&
    !isProjectPage &&
    !isOrganizationPage
  ) {
    console.log("Redirecting to onboarding - no orgId");
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // 4️⃣ If user has orgId and is on onboarding page, redirect to organization
  if (
    userId &&
    orgId &&
    pathname === "/onboarding"
  ) {
    console.log("Redirecting to organization - user has orgId");
    return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
  }

  // 5️⃣ Otherwise allow access
  console.log("Allowing access");
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};