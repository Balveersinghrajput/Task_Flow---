"use client";

import { UserButton } from "@clerk/nextjs";

const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10 rounded-full",
        },
      }}
      userProfileMode="menu" // lets the avatar open the menu automatically
    />
  );
};

export default UserMenu;
