"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";

import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import { BarLoader } from "react-spinners";

import useFetch from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";

import { updateSprintStatus } from "@/actions/sprints";

export default function SprintManager({
  sprint,
  setSprint,
  sprints,
  projectId,
}) {
  const [status, setStatus] = useState(sprint.status);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    fn: updateStatus,
    loading,
    error,
    data: updatedStatus,
  } = useFetch(updateSprintStatus);

  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();

  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";

  const canEnd = status === "ACTIVE";

  const handleStatusChange = useCallback(async (newStatus) => {
    console.log("Updating sprint status to:", newStatus);
    try {
      await updateStatus(sprint.id, newStatus);
    } catch (err) {
      console.error("Failed to update sprint:", err);
    }
  }, [sprint.id, updateStatus]);

  useEffect(() => {
    if (updatedStatus && updatedStatus.success) {
      console.log("Status update successful!");
      setStatus(updatedStatus.sprint.status);
      setSprint({
        ...sprint,
        status: updatedStatus.sprint.status,
      });
      router.refresh();
    }
    
    if (updatedStatus && !updatedStatus.success) {
      console.error("Status update failed:", updatedStatus.error);
    }
  }, [updatedStatus, router, setSprint, sprint]);

  const getStatusText = () => {
    const currentNow = new Date();
    
    if (status === "COMPLETED") {
      return `Sprint Ended`;
    }
    if (status === "ACTIVE" && isAfter(currentNow, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    }
    if (status === "PLANNED" && isBefore(currentNow, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }
    return null;
  };

  useEffect(() => {
    const sprintId = searchParams.get("sprint");
    if (sprintId && sprintId !== sprint.id) {
      const selectedSprint = sprints.find((s) => s.id === sprintId);
      if (selectedSprint) {
        setSprint(selectedSprint);
        setStatus(selectedSprint.status);
      }
    }
  }, [searchParams, sprints, sprint.id, setSprint]);

  const handleSprintChange = useCallback((value) => {
    const selectedSprint = sprints.find((s) => s.id === value);
    if (selectedSprint) {
      setSprint(selectedSprint);
      setStatus(selectedSprint.status);
      router.replace(`/project/${projectId}`);
    }
  }, [sprints, setSprint, router, projectId]);

  return (
    <div className="space-y-4 pointer-events-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <Select value={sprint.id} onValueChange={handleSprintChange}>
          <SelectTrigger className="bg-slate-950 self-start w-full sm:w-auto min-w-[250px] pointer-events-auto">
            <SelectValue placeholder="Select Sprint" />
          </SelectTrigger>
          <SelectContent className="pointer-events-auto">
            {sprints.map((sprintItem) => (
              <SelectItem key={sprintItem.id} value={sprintItem.id}>
                {sprintItem.name} ({format(sprintItem.startDate, "MMM d, yyyy")} to{" "}
                {format(sprintItem.endDate, "MMM d, yyyy")})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 w-full sm:w-auto">
          {canStart && (
            <Button
              onClick={() => handleStatusChange("ACTIVE")}
              disabled={loading}
              className="bg-green-900 text-white hover:bg-green-800 flex-1 sm:flex-initial pointer-events-auto"
            >
              {loading ? "Starting..." : "Start Sprint"}
            </Button>
          )}
          {canEnd && (
            <Button
              onClick={() => handleStatusChange("COMPLETED")}
              disabled={loading}
              variant="destructive"
              className="flex-1 sm:flex-initial pointer-events-auto"
            >
              {loading ? "Ending..." : "End Sprint"}
            </Button>
          )}
        </div>
      </div>
      
      {loading && (
        <BarLoader width={"100%"} className="mt-2" color="#36d7b7" />
      )}
      
      {error && (
        <Badge variant="destructive" className="mt-3 ml-1 self-start">
          Error: {error.message || "Failed to update sprint"}
        </Badge>
      )}
      
      {getStatusText() && !error && (
        <Badge className="mt-3 ml-1 self-start">
          {getStatusText()}
        </Badge>
      )}
    </div>
  );
}