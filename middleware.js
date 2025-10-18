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
  "/project/[projectId]"
  // Allow access to specific project pages (they contain org info)
  // This will be handled by checking if the path matches /project/[projectId]
  // Add more paths here as needed
];

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl.pathname;
  const authData = auth();

  // Minimal logging for performance
  if (process.env.NODE_ENV === 'development') {
    console.log(`Middleware: ${pathname} - userId: ${authData.userId}, orgId: ${authData.orgId}`);
  }

  // 1️⃣ Redirect to sign-in if user not signed in and trying to access a protected route
  if (!authData.userId && isProtectedRoute(req)) {
    console.log("Redirecting to sign-in");
    return authData.redirectToSignIn();
  }

  // 2️⃣ Check if this is a project page (e.g., /project/abc123)
  const isProjectPage = /^\/project\/[^\/]+$/.test(pathname);
  console.log(`Is project page: ${isProjectPage}`);

  // 3️⃣ Redirect signed-in users without an orgId to onboarding,
  // unless the path is in allowedWithoutOrg OR it's a project page
  if (
    authData.userId &&
    !authData.orgId &&
    !allowedWithoutOrg.includes(pathname) &&
    !isProjectPage
  ) {
    console.log("Redirecting to onboarding - no orgId");
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // 4️⃣ Otherwise allow access
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
