"use client";

import { checkProjectKeyAvailability, createProject } from "@/actions/projects";
import { projectSchema } from "@/app/lib/validators";
import OrgSwitcher from "@/components/org-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useOrganization, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [keyValidation, setKeyValidation] = useState({ checking: false, available: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  // ✅ Admin check
  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(
        membership.role === "org:admin" || membership.role === "admin"
      );
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  // ✅ Debounced key validation function
  const validateKey = useCallback(async (key) => {
    if (!key || !membership?.organization?.id) return;
    
    setKeyValidation({ checking: true, available: null, message: "Checking availability..." });
    
    try {
      const isAvailable = await checkProjectKeyAvailability(key, membership.organization.id);
      setKeyValidation({
        checking: false,
        available: isAvailable,
        message: isAvailable ? "✅ Key is available" : "❌ Key already exists"
      });
    } catch (error) {
      setKeyValidation({
        checking: false,
        available: false,
        message: "Error checking key availability"
      });
    }
  }, [membership?.organization?.id]);

  // ✅ Debounced validation with timeout
  const debouncedValidateKey = useCallback((key) => {
    const timeoutId = setTimeout(() => {
      validateKey(key);
    }, 500); // 500ms delay
    
    return () => clearTimeout(timeoutId);
  }, [validateKey]);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }

    if (!membership?.organization?.id) {
      alert("No Organization Selected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Creating project with data:", data);
      console.log("Organization ID:", membership.organization.id);
      
      // ✅ Pass orgId explicitly
      const project = await createProject({
        ...data,
        orgId: membership.organization.id,
      });

      console.log("Project created successfully:", project);
      setSuccess(true);

      // ✅ Automatic redirect after short delay
      setTimeout(() => {
        console.log("Redirecting automatically to:", `/project/${project.id}`);
        router.replace(`/project/${project.id}`);
      }, 800); // Short delay to show success message
    } catch (err) {
      console.error("Error creating project:", err);
      console.log("Error details:", {
        message: err.message,
        userId: membership?.user?.id,
        orgId: membership?.organization?.id,
        isAdmin: isAdmin
      });
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOrgLoaded || !isUserLoaded) {
    console.log("Loading state:", { isOrgLoaded, isUserLoaded });
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title">
          Oops! Only Admins can create projects.
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div>
          <Input
            id="name"
            {...register("name")}
            className="bg-slate-950"
            placeholder="Project Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            id="key"
            {...register("key")}
            className="bg-slate-950"
            placeholder="Project Key (Ex: RCYT)"
            onChange={(e) => {
              const value = e.target.value;
              if (value.length >= 2) {
                debouncedValidateKey(value);
              } else {
                setKeyValidation({ checking: false, available: null, message: "" });
              }
            }}
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
          {keyValidation.message && (
            <p className={`text-sm mt-1 ${
              keyValidation.checking 
                ? "text-blue-500" 
                : keyValidation.available 
                  ? "text-green-500" 
                  : "text-red-500"
            }`}>
              {keyValidation.message}
            </p>
          )}
        </div>

        <div>
          <Textarea
            id="description"
            {...register("description")}
            className="bg-slate-950 h-28"
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {loading && <BarLoader className="mb-4" width="100%" color="#36d7b7" />}

        <Button 
          type="submit" 
          size="lg" 
          disabled={loading || keyValidation.available === false} 
          className="bg-blue-500 text-white"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>

        {error && (
          <div className="text-red-500 mt-2 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="font-semibold">Error creating project:</p>
            <p className="text-sm">{error.message}</p>
            {error.message.includes("already exists") && (
              <p className="text-xs mt-1 text-red-600">
                💡 Try using a different project key (e.g., RCYT2, RCYT-NEW, etc.)
              </p>
            )}
          </div>
        )}
        {success && !loading && (
          <div className="text-green-500 text-center mt-2 p-4 bg-green-50 rounded-lg">
            <p className="font-semibold">Project created successfully!</p>
            <p className="text-sm">Redirecting to project page...</p>
            <div className="mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mx-auto"></div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
