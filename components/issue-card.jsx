"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

// Helper function to format time ago
const formatTimeAgo = (date) => {
  if (!date) return 'Unknown';
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
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
  const [sprintStatus, setSprintStatus] = useState('no-sprint');
  const intervalRef = useRef(null);
  const router = useRouter();

  // Extract primitive values for dependencies
  const sprintStartDate = issue?.sprint?.startDate;
  const sprintEndDate = issue?.sprint?.endDate;
  const createdAt = issue?.createdAt;
  const priority = issue?.priority;

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
    sprint: issue.sprint ? {
      startDate: issue.sprint.startDate,
      endDate: issue.sprint.endDate,
      status: issue.sprint.status
    } : null,
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

  // Real-time countdown timer effect
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!safeIssue) return;

    const now = new Date();
    
    // Check if issue has a sprint
    if (!sprintStartDate && !sprintEndDate) {
      setSprintStatus('no-sprint');
      return;
    }

    const sprintStart = sprintStartDate ? new Date(sprintStartDate) : null;
    const sprintEnd = sprintEndDate ? new Date(sprintEndDate) : null;

    // If sprint hasn't started, don't show timer
    if (sprintStart && now < sprintStart) {
      setSprintStatus('not-started');
      return;
    }

    // Sprint is active, show timer to deadline
    setSprintStatus('active');
    
    // Calculate deadline - prioritize sprint end date, fallback to priority-based
    let deadline;
    if (sprintEnd) {
      deadline = sprintEnd;
    } else if (createdAt && priority) {
      const created = new Date(createdAt);
      const daysToAdd = priorityDeadlineDays[priority] || 7;
      deadline = new Date(created.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }

    if (!deadline) return;

    const calculateTimeRemaining = () => {
      const currentTime = new Date();
      const diff = deadline - currentTime;

      if (diff <= 0) {
        const overdueDiff = Math.abs(diff);
        const days = Math.floor(overdueDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((overdueDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((overdueDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((overdueDiff % (1000 * 60)) / 1000);
        
        setIsOverdue(true);
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setIsOverdue(false);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    calculateTimeRemaining();
    intervalRef.current = setInterval(calculateTimeRemaining, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [sprintStartDate, sprintEndDate, createdAt, priority]);

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

  const created = formatTimeAgo(safeIssue.createdAt);

  // Render timer based on sprint status
  const renderTimer = () => {
    // Don't show timer if no sprint or sprint not started
    if (sprintStatus !== 'active') {
      return null;
    }

    return (
      <div className={`flex flex-col items-end gap-0.5 text-[10px] sm:text-xs font-mono flex-shrink-0 ${isOverdue ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
        {isOverdue && (
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm">⚠️</span>
            <span className="font-semibold text-[9px] sm:text-[10px]">OVERDUE</span>
          </div>
        )}
        
        <div className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
          {timeRemaining.days > 0 && (
            <>
              <span className="font-semibold">{timeRemaining.days}</span>
              <span className="text-[8px] sm:text-[10px]">d</span>
              <span>:</span>
            </>
          )}
          <span>{String(timeRemaining.hours).padStart(2, '0')}</span>
          <span className="text-[8px] sm:text-[10px]">h</span>
          <span>:</span>
          <span>{String(timeRemaining.minutes).padStart(2, '0')}</span>
          <span className="text-[8px] sm:text-[10px]">m</span>
          <span className="hidden sm:inline">:</span>
          <span className="hidden sm:inline">{String(timeRemaining.seconds).padStart(2, '0')}</span>
          <span className="hidden sm:inline text-[8px] sm:text-[10px]">s</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow w-full"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader
          className={`border-t-2 ${priorityColor[safeIssue.priority]} rounded-lg px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4`}
        >
          <div className="flex items-start justify-between gap-2">
            {/* Title - responsive text sizing */}
            <CardTitle className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl line-clamp-2 break-words pr-2 min-w-0">
              {safeIssue.title}
            </CardTitle>
            
            {/* Timer - only show if sprint is active */}
            {renderTimer()}
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
          
          {/* Sprint status badge - only show if sprint exists but not started */}
          {sprintStatus === 'not-started' && (
            <Badge 
              variant="outline" 
              className="text-[10px] xs:text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1 border-blue-400 text-blue-600"
            >
              Sprint Not Started
            </Badge>
          )}
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