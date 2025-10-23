"use client";

import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

import { getIssuesForSprint, updateIssueOrder } from "@/actions/issues";
import statuses from "@/data/status";

import IssueCard from "@/components/issue-card";
import BoardFilters from "./board-filters";
import IssueCreationDrawer from "./create-issue";
import SprintManager from "./sprint-manager";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function SprintBoard({ sprints, projectId, orgId }) {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const {
    loading: issuesLoading,
    error: issuesError,
    fn: fetchIssues,
    data: issues,
    setData: setIssues,
  } = useFetch(getIssuesForSprint);

  const [filteredIssues, setFilteredIssues] = useState(issues);

  const handleFilterChange = (newFilteredIssues) => {
    setFilteredIssues(newFilteredIssues);
  };

  useEffect(() => {
    if (currentSprint.id) {
      fetchIssues(currentSprint.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSprint.id]);

  const handleAddIssue = (status) => {
    setSelectedStatus(status);
    setIsDrawerOpen(true);
  };

  const handleIssueCreated = () => {
    fetchIssues(currentSprint.id);
  };

  const {
    fn: updateIssueOrderFn,
    loading: updateIssuesLoading,
    error: updateIssuesError,
  } = useFetch(updateIssueOrder);

  const onDragEnd = async (result) => {
    if (currentSprint.status === "PLANNED") {
      toast.warning("Start the sprint to update board");
      return;
    }
    if (currentSprint.status === "COMPLETED") {
      toast.warning("Cannot update board after sprint end");
      return;
    }
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newOrderedData = [...issues];

    // source and destination list
    const sourceList = newOrderedData.filter(
      (list) => list.status === source.droppableId
    );

    const destinationList = newOrderedData.filter(
      (list) => list.status === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reorder(
        sourceList,
        source.index,
        destination.index
      );

      reorderedCards.forEach((card, i) => {
        card.order = i;
      });
    } else {
      // remove card from the source list
      const [movedCard] = sourceList.splice(source.index, 1);

      // assign the new list id to the moved card
      movedCard.status = destination.droppableId;

      // add new card to the destination list
      destinationList.splice(destination.index, 0, movedCard);

      sourceList.forEach((card, i) => {
        card.order = i;
      });

      // update the order for each card in destination list
      destinationList.forEach((card, i) => {
        card.order = i;
      });
    }

    const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
    setIssues(newOrderedData, sortedIssues);

    updateIssueOrderFn(sortedIssues);
  };

  if (issuesError) {
    return (
      <div className="relative overflow-hidden rounded-xl border-2 border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-gray-900 p-4 sm:p-6 shadow-xl mx-2 sm:mx-0 mt-4">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-red-900 dark:text-red-400 text-base sm:text-lg mb-1">Error loading issues</p>
            <p className="text-xs sm:text-sm text-red-700 dark:text-red-500 break-words">{issuesError.message || "An unexpected error occurred"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2 sm:px-4 lg:px-0">
      {/* Sprint Manager Section */}
      <div className="mb-4 sm:mb-6">
        <SprintManager
          sprint={currentSprint}
          setSprint={setCurrentSprint}
          sprints={sprints}
          projectId={projectId}
        />
      </div>

      {/* Board Filters Section */}
      {issues && !issuesLoading && (
        <div className="mb-4 sm:mb-6">
          <BoardFilters issues={issues} onFilterChange={handleFilterChange} />
        </div>
      )}

      {/* Error Message */}
      {updateIssuesError && (
        <div className="mb-4 p-3 sm:p-4 bg-red-100 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm sm:text-base font-medium flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="break-words">{updateIssuesError.message}</span>
          </p>
        </div>
      )}

      {/* Loading Bar */}
      {(updateIssuesLoading || issuesLoading) && (
        <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
          <BarLoader width={"100%"} color="#36d7b7" height={4} />
        </div>
      )}

      {/* Drag and Drop Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl opacity-20 blur-2xl"></div>
          
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-slate-700/50 dark:border-slate-800/50 shadow-2xl backdrop-blur-sm">
          {statuses.map((column) => (
            <Droppable key={column.key} droppableId={column.key}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 relative"
                >
                  {/* Column decorative glow */}
                  <div className="absolute -inset-2 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-wide mb-2 text-center drop-shadow-lg">
                      {column.name}
                    </h3>
                  {filteredIssues
                    ?.filter((issue) => issue.status === column.key)
                    .map((issue, index) => (
                      <Draggable
                        key={issue.id}
                        draggableId={issue.id}
                        index={index}
                        isDragDisabled={updateIssuesLoading}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <IssueCard
                              issue={issue}
                              onDelete={() => fetchIssues(currentSprint.id)}
                              onUpdate={(updated) =>
                                setIssues((issues) =>
                                  issues.map((issue) => {
                                    if (issue.id === updated.id) return updated;
                                    return issue;
                                  })
                                )
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  {column.key === "TODO" &&
                    currentSprint.status !== "COMPLETED" && (
                      <Button
                        variant="ghost"
                        className="w-full mt-3 sm:mt-4 border-2 border-dashed border-slate-600 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-600 hover:bg-blue-950/30 dark:hover:bg-blue-950/40 transition-all duration-300 group rounded-lg sm:rounded-xl h-10 sm:h-11 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
                        onClick={() => handleAddIssue(column.key)}
                      >
                        <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors font-semibold">
                          <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-90 transition-transform duration-300" />
                          <span className="text-xs sm:text-sm">Create Issue</span>
                        </div>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
        </div>
      </DragDropContext>

      {/* Issue Creation Drawer */}
      <IssueCreationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sprintId={currentSprint.id}
        status={selectedStatus}
        projectId={projectId}
        onIssueCreated={handleIssueCreated}
        orgId={orgId}
      />
    </div>
  );
}