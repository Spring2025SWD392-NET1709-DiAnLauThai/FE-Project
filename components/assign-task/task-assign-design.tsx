"use client";

import { useState, useEffect } from "react";
import { Task } from "@/domains/models/tasks";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// Mock designer data - replace with actual API call in production
const DESIGNERS = [
  { id: "1", name: "Jane Cooper", specialization: "Logo Design" },
  { id: "2", name: "Alex Johnson", specialization: "Web Design" },
  { id: "3", name: "Maria Garcia", specialization: "Illustrations" },
  { id: "4", name: "John Smith", specialization: "Product Design" },
  { id: "5", name: "Emma Wilson", specialization: "UI/UX Design" },
];

interface AssignDesignerFormProps {
  task: Task;
  onSuccess: () => void;
}

export function AssignDesignerForm({
  task,
  onSuccess,
}: AssignDesignerFormProps) {
  const [selectedDesignerId, setSelectedDesignerId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDesignerId) {
      toast({
        title: "Error",
        description: "Please select a designer",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the selected designer name for displaying in the toast
      const selectedDesigner = DESIGNERS.find(
        (d) => d.id === selectedDesignerId
      );

      toast({
        title: "Designer Assigned",
        description: `${selectedDesigner?.name} has been assigned to task #${task.orderId}`,
      });

      // Invalidate tasks query to refresh data
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      onSuccess();
    } catch (error) {
      console.error("Error assigning designer:", error);
      toast({
        title: "Error",
        description: "Failed to assign designer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="task-details">Task Details</Label>
        <div className="rounded-md bg-slate-100 p-3 text-sm">
          <p>
            <strong>Order ID:</strong> {task.orderId}
          </p>
          <p>
            <strong>Subject:</strong> {task.subject}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="designer">Select Designer</Label>
        <Select
          onValueChange={setSelectedDesignerId}
          value={selectedDesignerId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a designer" />
          </SelectTrigger>
          <SelectContent>
            {DESIGNERS.map((designer) => (
              <SelectItem
                key={designer.id}
                value={designer.id}
                className="flex justify-between"
              >
                <div className="flex flex-col">
                  <span>{designer.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {designer.specialization}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Assigning..." : "Assign Designer"}
        </Button>
      </div>
    </form>
  );
}
