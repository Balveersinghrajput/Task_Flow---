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
import { toast } from "sonner";

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

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(
        membership.role === "org:admin" || membership.role === "admin"
      );
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create project", {
        description: error.message?.includes("already exists") 
          ? "Try using a different project key (e.g., RCYT2, RCYT-NEW, etc.)"
          : undefined,
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Project created successfully!", {
        description: "Redirecting to project page...",
      });
    }
  }, [success]);

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

  const debouncedValidateKey = useCallback((key) => {
    const timeoutId = setTimeout(() => {
      validateKey(key);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [validateKey]);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      toast.error("Only organization admins can create projects");
      return;
    }

    if (!membership?.organization?.id) {
      toast.error("No Organization Selected");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Creating project with data:", data);
      console.log("Organization ID:", membership.organization.id);
      
      const project = await createProject({
        ...data,
        orgId: membership.organization.id,
      });

      console.log("Project created successfully:", project);
      setSuccess(true);

      setTimeout(() => {
        console.log("Redirecting automatically to:", `/project/${project.id}`);
        router.replace(`/project/${project.id}`);
      }, 800);
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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-20">
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950 dark:via-gray-900 dark:to-orange-950 p-12 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold gradient-title">
                Admin Access Required
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Only organization administrators can create new projects
              </p>
              
              <div className="pt-4">
                <OrgSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-title">
            Create New Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Set up a new project for your organization
          </p>
        </div>

        {/* Form Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Project Name
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  className="h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Project Key */}
              <div className="space-y-2">
                <label htmlFor="key" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Project Key
                </label>
                <Input
                  id="key"
                  {...register("key")}
                  className="h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all font-mono uppercase"
                  placeholder="e.g., RCYT"
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
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.key.message}
                  </p>
                )}
                {keyValidation.message && (
                  <div className={`flex items-center gap-2 text-sm font-medium ${
                    keyValidation.checking 
                      ? "text-blue-500" 
                      : keyValidation.available 
                        ? "text-green-500" 
                        : "text-red-500"
                  }`}>
                    {keyValidation.checking ? (
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : keyValidation.available ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    {keyValidation.message}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className="min-h-[120px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Describe your project..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Loading Bar */}
              {loading && (
                <div className="rounded-lg overflow-hidden">
                  <BarLoader width="100%" color="#3b82f6" height={4} />
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                disabled={loading || keyValidation.available === false} 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Project...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Project
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}