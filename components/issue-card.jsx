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
import { useState } from "react";
import IssueDetailsDialog from "./issue-details-dialog";
import UserAvatar from "./user-avatar";

const priorityColor = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

export default function IssueCard({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader
          className={`border-t-2 ${priorityColor[safeIssue.priority]} rounded-lg`}
        >
          <CardTitle>{safeIssue.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-2 -mt-3">
          {showStatus && <Badge>{safeIssue.status}</Badge>}
          <Badge variant="outline" className="-ml-1">
            {safeIssue.priority}
          </Badge>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-3">
          <UserAvatar user={safeIssue.assignee} />

          <div className="text-xs text-gray-400 w-full">Created {created}</div>
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
