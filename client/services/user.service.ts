import { http } from "@/lib/http";
import { User } from "@/types/user";

export const userService = {
  getUser: async (): Promise<User> =>
    await http.get<User>("/user/get-user-by-id").then((res) => res.data),
};
