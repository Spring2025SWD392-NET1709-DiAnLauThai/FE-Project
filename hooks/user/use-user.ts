import { userService } from "@/domains/services/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = (page: number, size: number) => {
  return useQuery({
    queryKey: ["users", page, size],
    queryFn: () => userService.getAllAccount({ page, size }),
  });
};
