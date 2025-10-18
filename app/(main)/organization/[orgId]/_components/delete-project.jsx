"use client";

import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DeleteProject({ projectId, orgId }) {  // ✅ Added orgId prop
  const { membership } = useOrganization();
  const router = useRouter();

  const {
    loading: isDeleting,
    error,
    fn: deleteProjectFn,
    data: deleted,
  } = useFetch(deleteProject);

  const isAdmin = membership?.role === "org:admin";

  const handleDelete = async () => {
    if (!orgId) {
      toast.error("Organization context is missing");
      console.error("No orgId available");
      return;
    }

    if (window.confirm("Are you sure you want to delete this project?")) {
      // ✅ Pass both projectId and orgId to the server action
      deleteProjectFn(projectId, orgId);
    }
  };

  useEffect(() => {
    if (deleted?.success) {
      toast.success("Project deleted successfully");
      router.refresh();
    }
  }, [deleted, router]);

  useEffect(() => {
    if (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete project");
    }
  }, [error]);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`${isDeleting ? "animate-pulse" : ""}`}
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
}