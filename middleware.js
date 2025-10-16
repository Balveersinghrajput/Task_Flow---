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
  "/project/create" // example extra path
  // Add more paths here as needed
];

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Redirect to sign-in if user not signed in and trying to access a protected route
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  // 2️⃣ Redirect signed-in users without an orgId to onboarding,
  // unless the path is in allowedWithoutOrg
  if (
    auth().userId &&
    !auth().orgId &&
    !allowedWithoutOrg.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // 3️⃣ Otherwise allow access
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
