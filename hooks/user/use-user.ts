import { userService } from "@/domains/services/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    return useQuery({
      queryKey: ["get-all-user"],
      queryFn: () => userService.getAllAccount(),
    });
};
