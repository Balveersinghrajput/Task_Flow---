"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IssueDetailsDialog from "./issue-details-dialog";
import UserAvatar from "./user-avatar";

const priorityColor = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

// Automatic deadline based on priority (in days) - fallback only
const priorityDeadlineDays = {
  LOW: 14,
  MEDIUM: 7,
  HIGH: 3,
  URGENT: 1,
};

export default function IssueCard({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isOverdue, setIsOverdue] = useState(false);
  const router = useRouter();

  // Ensure issue data is safe to use
  const safeIssue = issue ? {
    id: issue.id,
    title: issue.title || 'Untitled',
    description: issue.description || '',
    status: issue.status || 'TODO',
    priority: issue.priority || 'MEDIUM',
    createdAt: issue.createdAt,
    projectId: issue.projectId,
    sprintId: issue.sprintId,
    sprint: issue.sprint || null,
    assignee: issue.assignee ? {
      id: issue.assignee.id,
      name: issue.assignee.name || 'Unknown',
      imageUrl: issue.assignee.imageUrl || null,
      clerkUserId: issue.assignee.clerkUserId
    } : null,
    reporter: issue.reporter ? {
      id: issue.reporter.id,
      name: issue.reporter.name || 'Unknown',
      imageUrl: issue.reporter.imageUrl || null,
      clerkUserId: issue.reporter.clerkUserId
    } : null
  } : null;

  // Calculate deadline - prioritize sprint end date, fallback to priority-based
  const getDeadline = () => {
    // First, try to use sprint end date
    if (safeIssue?.sprint?.endDate) {
      return new Date(safeIssue.sprint.endDate);
    }
    
    // Fallback to priority-based deadline
    if (!safeIssue?.createdAt || !safeIssue?.priority) return null;
    const created = new Date(safeIssue.createdAt);
    const daysToAdd = priorityDeadlineDays[safeIssue.priority] || 7;
    return new Date(created.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  };

  // Real-time countdown timer effect
  useEffect(() => {
    const deadline = getDeadline();
    if (!deadline) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setIsOverdue(true);
        const overdueDiff = Math.abs(diff);
        const days = Math.floor(overdueDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((overdueDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((overdueDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((overdueDiff % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setIsOverdue(false);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [safeIssue?.createdAt, safeIssue?.priority, safeIssue?.sprint?.endDate]);

  if (!safeIssue) {
    return null;
  }

  const onDeleteHandler = (...params) => {
    router.refresh();
    onDelete(...params);
  };

  const onUpdateHandler = (...params) => {
    router.refresh();
    onUpdate(...params);
  };

  const created = safeIssue.createdAt ? formatDistanceToNow(new Date(safeIssue.createdAt), {
    addSuffix: true,
  }) : 'Unknown';

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow w-full"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader
          className={`border-t-2 ${priorityColor[safeIssue.priority]} rounded-lg px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4`}
        >
          <div className="flex items-start justify-between gap-2 mt-1">
            {/* Title - responsive text sizing */}
            <CardTitle className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl line-clamp-2 break-words pr-2">
              {safeIssue.title}
            </CardTitle>
            
            {/* Timer - responsive display */}
            <div className={`flex flex-col sm:flex-row items-end sm:items-center gap-0.5 sm:gap-1 text-[9px] xs:text-[10px] sm:text-xs font-mono whitespace-nowrap flex-shrink-0 ${isOverdue ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
              {/* Warning icon */}
              {isOverdue && <span className="text-xs sm:text-sm">⚠</span>}
              
              {/* Timer display - stacked on mobile, inline on desktop */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0 sm:gap-1">
                {/* Days (only if > 0) */}
                {timeRemaining.days > 0 && (
                  <span className="hidden xs:inline">{timeRemaining.days}d</span>
                )}
                
                {/* Time display - compact on mobile */}
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <span>{String(timeRemaining.hours).padStart(2, '0')}h</span>
                  <span className="hidden xs:inline">:</span>
                  <span>{String(timeRemaining.minutes).padStart(2, '0')}m</span>
                  <span className="hidden sm:inline">:</span>
                  <span className="hidden sm:inline">{String(timeRemaining.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Badges - responsive spacing and sizing */}
        <CardContent className="flex flex-wrap gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 md:px-6 -mt-2 sm:-mt-3">
          {showStatus && (
            <Badge className="text-[10px] xs:text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1">
              {safeIssue.status}
            </Badge>
          )}
          <Badge 
            variant="outline" 
            className="text-[10px] xs:text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1"
          >
            {safeIssue.priority}
          </Badge>
        </CardContent>

        {/* Footer - responsive spacing */}
        <CardFooter className="flex flex-col items-start space-y-2 sm:space-y-3 px-3 py-3 sm:px-4 sm:py-4 md:px-6">
          {/* User Avatar */}
          <UserAvatar user={safeIssue.assignee} />

          {/* Created timestamp - responsive text */}
          <div className="text-[10px] xs:text-xs sm:text-sm text-gray-400 w-full">
            Created {created}
          </div>
        </CardFooter>
      </Card>

      {isDialogOpen && (
        <IssueDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          issue={safeIssue}
          onDelete={onDeleteHandler}
          onUpdate={onUpdateHandler}
          borderCol={priorityColor[safeIssue.priority]}
        />
      )}
    </>
  );
}