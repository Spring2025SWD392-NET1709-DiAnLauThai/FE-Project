// components/user-form/user-form-dialog.tsx
import { UserPayload, UserRole } from "@/domains/models/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface UserFormProps {
  form: UseFormReturn<UserPayload>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  type: "create" | "update";
  isAdminUpdate?: boolean;
}

export function UserForm({
  form,
  onSubmit,
  isLoading,
  type,
  isAdminUpdate = false,
}: UserFormProps) {
  // Fields should be read-only only if it's an admin update AND type is update
  const isFieldReadOnly = type === "update" && isAdminUpdate;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  {...field}
                  readOnly={isFieldReadOnly}
                  className={
                    isFieldReadOnly ? "bg-gray-300 cursor-not-allowed" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  readOnly={isFieldReadOnly}
                  className={
                    isFieldReadOnly ? "bg-gray-300 cursor-not-allowed" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number"
                  value={field.value || ""}
                  onChange={(e) => {
                    if (!isFieldReadOnly) {
                      // Only allow numeric input
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(numericValue);
                    }
                  }}
                  readOnly={isFieldReadOnly}
                  className={
                    isFieldReadOnly ? "bg-gray-300 cursor-not-allowed" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter address"
                  {...field}
                  readOnly={isFieldReadOnly}
                  className={
                    isFieldReadOnly ? "bg-gray-300 cursor-not-allowed" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    if (!isFieldReadOnly) {
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : null
                      );
                    }
                  }}
                  readOnly={isFieldReadOnly}
                  className={
                    isFieldReadOnly ? "bg-gray-300 cursor-not-allowed" : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
                disabled={type === "update" && !isAdminUpdate}
              >
                <FormControl>
                  <SelectTrigger
                    className={
                      type === "update" && !isAdminUpdate
                        ? "bg-gray-300 cursor-not-allowed"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === "update" && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  disabled={!isAdminUpdate}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        !isAdminUpdate ? "bg-gray-300 cursor-not-allowed" : ""
                      }
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? type === "create"
              ? "Creating..."
              : "Updating..."
            : type === "create"
            ? "Create User"
            : "Update User"}
        </Button>
      </form>
    </Form>
  );
}
