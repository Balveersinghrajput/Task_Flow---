// components/header.jsx (or header.js)
import { checkUser } from '@/lib/checkUser.js';
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { PenBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button.jsx";
import UserLoading from './user-loading.jsx';
import UserMenu from './user-menu';

export const Header = async () => {
  // Only check user if they're signed in
  const clerkUser = await currentUser();
  if (clerkUser) {
    await checkUser();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto">
        <nav className="py-4 px-4 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Image
                src="/companies/Task-logo.png"
                alt="TaskFlow logo"
                width={200}
                height={56}
                className="h-10 w-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">
            {/* Create Project Button */}
            <SignedIn>
              <Link href="/project/create">
                <Button 
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  
                  <PenBox size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300"/>
                  <span className="relative z-10">Create Project</span>
                </Button>
              </Link>
            </SignedIn>

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton forceRedirectUrl="/onboarding">
                <Button 
                  variant="outline" 
                  className="border-2 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 backdrop-blur-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Login
                  </span>
                </Button>
              </SignInButton> 
            </SignedOut>

            <SignedIn>
              <UserMenu/>
            </SignedIn>
          </div>
        </nav>

        <UserLoading/>
      </div>
    </header>
  );
};