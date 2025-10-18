"use client";

import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";
import { useEffect, useState } from "react";

const UserMenu = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          createOrganizationMode="modal"
          afterCreateOrganizationUrl={(org) => `/organization/${org.id}`}
          afterSelectOrganizationUrl={(org) => `/organization/${org.id}`}
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "border border-gray-300 rounded-md px-3 py-1 text-sm",
              organizationSwitcherTriggerIcon: "text-white",
            },
          }}
        />
      </SignedIn>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-10 h-10 rounded-full",
          },
        }}
        userProfileMode="menu"
      >
        <UserButton.MenuItems>
          <UserButton.Link 
            label="My Organizations" 
            labelIcon={<ChartNoAxesGantt size={15} />}
            href="/onboarding"
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default UserMenu;
