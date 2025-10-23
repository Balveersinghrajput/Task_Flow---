import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes that don't need auth
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/api/webhooks(.*)', // Allow webhook endpoints
]);

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
  "/onboarding",
  "/project/create",
];

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  
  // IMPORTANT: Skip everything for public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const { userId, orgId, redirectToSignIn } = await auth();

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Middleware] ${pathname} | userId: ${!!userId} | orgId: ${orgId || 'none'}`);
  }

  // 1️⃣ Redirect to sign-in if user not signed in and trying to access protected route
  if (!userId && isProtectedRoute(req)) {
    console.log("[Middleware] Redirecting to sign-in - no userId");
    return redirectToSignIn({ returnBackUrl: pathname });
  }

  // 2️⃣ Check if this is a project or organization page
  const isProjectPage = /^\/project\/[^\/]+$/.test(pathname);
  const isOrganizationPage = /^\/organization\/[^\/]+$/.test(pathname);

  // 3️⃣ Redirect signed-in users without orgId to onboarding
  if (
    userId &&
    !orgId &&
    !allowedWithoutOrg.includes(pathname) &&
    !isProjectPage &&
    !isOrganizationPage &&
    pathname !== '/'
  ) {
    console.log("[Middleware] Redirecting to onboarding - no orgId");
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // 4️⃣ If user has orgId and is on onboarding, redirect to organization
  if (userId && orgId && pathname === "/onboarding") {
    console.log("[Middleware] Redirecting to organization - user already has orgId");
    return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url));
  }

  // 5️⃣ Allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};