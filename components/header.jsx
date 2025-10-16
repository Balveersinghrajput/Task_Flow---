import { checkUser } from '@/lib/checkUser.js';
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { PenBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button.jsx";
import UserLoading from './user-loading.jsx';
import UserMenu from './user-menu';


export const Header = async() => {

  await checkUser();

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">
          <Image
            src={"/companies/atlassian.svg"}
            alt="TaskFlow logo"
            width={200}
            height={50}
            className="h-10 w-auto object-contain"
          />
          </h1>
        </Link>

        <div className="flex items-center gap-4">

          <Link href="/project/create" >
            <Button variant="destructive" className="flex items-center gap-2">
            <PenBox size={18}/>
              <span>Create Project</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
              
            </SignInButton> 
          </SignedOut>

          <SignedIn>
            {/* <UserButton /> */}
            <UserMenu/>
          </SignedIn>
        </div>
      </nav>

<UserLoading/>

    </header>
  );
};
