"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";

import { createSprint } from "@/actions/sprints";
import { sprintSchema } from "@/app/lib/validators";
import useFetch from "@/hooks/use-fetch";

export default function SprintCreationForm({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}) {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });
  const router = useRouter();

  // Initialize dates on client side to avoid hydration issues
  useEffect(() => {
    if (!dateRange.from) {
      setDateRange({
        from: new Date(),
        to: addDays(new Date(), 14),
      });
    }
  }, []);

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from || new Date(),
      endDate: dateRange.to || addDays(new Date(), 14),
    },
  });

  const onSubmit = async (data) => {
    await createSprintFn(projectId, {
      ...data,
      startDate: dateRange.from || new Date(),
      endDate: dateRange.to || addDays(new Date(), 14),
    });
    setShowForm(false);
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div className="relative w-full sm:w-auto">
          {/* Decorative glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-lg"></div>
          
          <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-title bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm break-words leading-tight">
            {projectTitle}
          </h1>
          
          {/* Decorative underline */}
          <div className="h-1 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-2 sm:mt-3 shadow-lg"></div>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          variant={!showForm ? "default" : "destructive"}
          className={`
            group relative overflow-hidden font-bold px-4 sm:px-6 py-4 sm:py-6 rounded-xl transition-all duration-300 w-full sm:w-auto text-sm sm:text-base shadow-xl hover:shadow-2xl
            ${!showForm 
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 hover:scale-105 border-2 border-white/20' 
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105'
            }
          `}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <span className="relative flex items-center justify-center gap-2">
            {!showForm ? (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Create New Sprint</span>
                <span className="sm:hidden">New Sprint</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            )}
          </span>
        </Button>
      </div>

      {/* Form Card */}
      {showForm && (
        <div className="animate-in slide-in-from-top-4 duration-500 mb-6 sm:mb-8">
          <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-900/50 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <CardContent className="relative z-10 pt-4 sm:pt-6 px-4 sm:px-6 pb-6">
              {/* Form header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5 sm:mb-6 pb-4 border-b-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Create New Sprint
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">Define your sprint timeline and get started</p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 sm:gap-6"
              >
                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                  {/* Sprint Name Field */}
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Sprint Name
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        {...register("name")}
                        readOnly
                        className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 border-2 border-blue-200 dark:border-blue-900 font-mono font-bold text-sm sm:text-base lg:text-lg h-11 sm:h-12 shadow-inner pr-14 sm:pr-16"
                      />
                      <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded">
                        AUTO
                      </div>
                    </div>
                    {errors.name && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="break-words">{errors.name.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Sprint Duration Field */}
                  <div className="w-full">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                      Sprint Duration
                    </label>
                    <Controller
                      control={control}
                      name="dateRange"
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`
                                w-full justify-start text-left font-semibold h-11 sm:h-12 text-xs sm:text-sm
                                bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-950 dark:to-purple-950 
                                border-2 border-purple-200 dark:border-purple-900 
                                hover:border-purple-400 dark:hover:border-purple-700 
                                hover:shadow-lg transition-all duration-300
                                ${!dateRange && "text-muted-foreground"}
                              `}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 overflow-hidden flex-1 min-w-0">
                                {dateRange.from && dateRange.to ? (
                                  <>
                                    <span className="truncate text-xs sm:text-sm">{format(dateRange.from, "MMM dd, y")}</span>
                                    <svg className="hidden sm:block w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    <span className="truncate text-xs sm:text-sm">{format(dateRange.to, "MMM dd, y")}</span>
                                  </>
                                ) : (
                                  <span className="text-xs sm:text-sm">Pick a date range</span>
                                )}
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-900 shadow-2xl p-0 overflow-hidden rounded-xl"
                            align="start"
                          >
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 sm:p-3">
                              <p className="text-white font-bold text-xs sm:text-sm">Select Sprint Dates</p>
                            </div>
                            <div className="p-2 sm:p-3">
                              <DayPicker
                                classNames={{
                                  root: "text-sm",
                                  chevron: "fill-purple-500",
                                  range_start: "bg-purple-700 text-white rounded-lg",
                                  range_end: "bg-purple-700 text-white rounded-lg",
                                  range_middle: "bg-purple-200 dark:bg-purple-900",
                                  day_button: "border-none hover:bg-purple-100 dark:hover:bg-purple-950 rounded-lg transition-colors text-xs sm:text-sm h-8 w-8 sm:h-9 sm:w-9",
                                  today: "border-2 border-purple-500 font-bold",
                                  month_caption: "text-xs sm:text-sm font-semibold mb-2",
                                }}
                                mode="range"
                                disabled={[{ before: new Date() }]}
                                selected={dateRange}
                                onSelect={(range) => {
                                  if (range?.from && range?.to) {
                                    setDateRange(range);
                                    field.onChange(range);
                                  }
                                }}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={createSprintLoading}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 sm:px-8 h-11 sm:h-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-white/20 w-full sm:w-auto sm:self-end text-sm sm:text-base"
                >
                  {/* Loading animation background */}
                  {createSprintLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  )}
                  
                  <span className="relative flex items-center justify-center gap-2">
                    {createSprintLoading ? (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="hidden sm:inline">Creating Sprint...</span>
                        <span className="sm:hidden">Creating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="hidden sm:inline">Create Sprint</span>
                        <span className="sm:hidden">Create</span>
                      </>
                    )}
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

