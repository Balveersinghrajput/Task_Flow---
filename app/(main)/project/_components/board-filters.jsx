"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export default function BoardFilters({ issues, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  
  // ✅ Use ref to track if this is the first render
  const isFirstRender = useRef(true);

  // Memoize assignees to avoid recalculating on every render
  const assignees = useMemo(() => {
    if (!issues || issues.length === 0) return [];
    
    return issues
      .map((issue) => issue.assignee)
      .filter((assignee) => assignee)
      .filter(
        (item, index, self) => 
          index === self.findIndex((t) => t?.id === item?.id)
      );
  }, [issues]);

  // ✅ Memoize the filtered issues
  const filteredIssues = useMemo(() => {
    if (!issues) return [];

    return issues.filter((issue) => {
      const matchesSearch = issue.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesAssignee =
        selectedAssignees.length === 0 ||
        (issue.assignee && selectedAssignees.includes(issue.assignee.id));

      const matchesPriority =
        selectedPriority === "" || issue.priority === selectedPriority;

      return matchesSearch && matchesAssignee && matchesPriority;
    });
  }, [searchTerm, selectedAssignees, selectedPriority, issues]);

  // ✅ CRITICAL FIX: Use useRef to store previous filtered issues
  const prevFilteredIssuesRef = useRef(filteredIssues);

  useEffect(() => {
    // Skip the first render to avoid calling onFilterChange with initial data
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevFilteredIssuesRef.current = filteredIssues;
      onFilterChange(filteredIssues);
      return;
    }

    // Only call onFilterChange if the filtered issues actually changed
    if (prevFilteredIssuesRef.current !== filteredIssues) {
      prevFilteredIssuesRef.current = filteredIssues;
      onFilterChange(filteredIssues);
    }
  }, [filteredIssues]); // Only depend on filteredIssues

  const toggleAssignee = useCallback((assigneeId) => {
    setSelectedAssignees((prev) =>
      prev.includes(assigneeId)
        ? prev.filter((id) => id !== assigneeId)
        : [...prev, assigneeId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedAssignees([]);
    setSelectedPriority("");
  }, []);

  const isFiltersApplied =
    searchTerm !== "" ||
    selectedAssignees.length > 0 ||
    selectedPriority !== "";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 items-start sm:items-center">
        <div className="w-full sm:w-72">
          <Input
            className="w-full"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {assignees.length > 0 && (
          <div className="flex-shrink-0">
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              {assignees.map((assignee, i) => {
                const selected = selectedAssignees.includes(assignee.id);

                return (
                  <button
                    key={assignee.id}
                    type="button"
                    className={`rounded-full ring-2 transition-all duration-200 hover:scale-110 cursor-pointer ${
                      selected 
                        ? "ring-blue-600 ring-offset-2 ring-offset-background" 
                        : "ring-slate-600 hover:ring-slate-400"
                    } ${i > 0 ? "sm:-ml-3" : ""}`}
                    style={{
                      zIndex: assignees.length - i,
                    }}
                    onClick={() => toggleAssignee(assignee.id)}
                    title={assignee.name}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={assignee.imageUrl} alt={assignee.name} />
                      <AvatarFallback className="text-sm font-semibold">
                        {assignee.name?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      priority === "URGENT"
                        ? "bg-red-500"
                        : priority === "HIGH"
                        ? "bg-orange-500"
                        : priority === "MEDIUM"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  {priority}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isFiltersApplied && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex items-center gap-2 whitespace-nowrap hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Clear Filters</span>
          </Button>
        )}
      </div>

      {isFiltersApplied && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {searchTerm && (
            <span className="px-2 py-1 bg-slate-800 rounded-md">
              Search: "{searchTerm}"
            </span>
          )}
          {selectedAssignees.length > 0 && (
            <span className="px-2 py-1 bg-slate-800 rounded-md">
              {selectedAssignees.length} assignee{selectedAssignees.length > 1 ? "s" : ""}
            </span>
          )}
          {selectedPriority && (
            <span className="px-2 py-1 bg-slate-800 rounded-md">
              Priority: {selectedPriority}
            </span>
          )}
        </div>
      )}
    </div>
  );
}