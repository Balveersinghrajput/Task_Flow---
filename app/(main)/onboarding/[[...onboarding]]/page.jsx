"use client";

import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Onboarding = () => {
  const {organization} = useOrganization();
  const router = useRouter();

  useEffect(() => {
if(organization){
  router.push(`/organization/${organization.id}`);
}
  }, [organization]);

  return (
   
      <div className="flex justify-center items-center pt-14">
        <OrganizationList
          hidePersonal
          afterCreateOrganizationUrl={(org) => `/organization/${org.id}`}
          afterSelectOrganizationUrl={(org) => `/organization/${org.id}`}
        />
      </div>
  )
}

export default Onboarding
