"use client";

import { SignUp } from "@clerk/nextjs";

const SignedUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
          }
        }}
      />
    </div>
  )
}

export default SignedUp;