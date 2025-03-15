"use client";

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
import { useDesigners } from "@/hooks/tasks/use-task";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAssignDesignerForm } from "@/hooks/tasks/use-task-form";
import { BookingResponse } from "@/domains/models/booking";

interface AssignDesignerFormProps {
  task: BookingResponse;
  onSuccess: () => void;
}

export function AssignDesignerForm({
  task,
  onSuccess,
}: AssignDesignerFormProps) {
  const { data: designersData, isLoading: isLoadingDesigners } = useDesigners();
  const { form, onSubmit, isSubmitting } = useAssignDesignerForm(
    task,
    onSuccess
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="task-details">Task Details</Label>
          <div className="rounded-md bg-slate-100 p-3 text-sm">
            <p>
              <strong>Booking ID:</strong> {task.id}
            </p>
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="designerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Designer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoadingDesigners}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a designer" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingDesigners ? (
                      <SelectItem value="loading" disabled>
                        Loading designers...
                      </SelectItem>
                    ) : (
                      designersData?.content.map((designer) => (
                        <SelectItem
                          key={designer.id}
                          value={designer.id}
                          className="flex justify-between"
                        >
                          <div className="flex flex-col">
                            <span>{designer.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {designer.email}
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoadingDesigners}>
            {isSubmitting ? "Assigning..." : "Assign Designer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
