"use client";

import { useUser } from "@/hooks/user/use-user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserPage() {
  const { data: users, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                    <TableCell>
                        {user.role}
                        {/* {user.dateOfBirth.toStrin} */}
                  {/* {(() => {
                    const date = parseISO(user.dateOfBirth);
                    return isNaN(date.getTime())
                      ? "Invalid Date"
                      : format(date, "dd/MM/yyyy");
                  })()} */}
                </TableCell>
                <TableRow>
                  <TableCell>
                    <button className="text-blue-600 mr-2">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </TableCell>
                </TableRow>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
