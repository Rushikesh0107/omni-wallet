import { http } from "@/lib/http";
import { User } from "@/types/user";

export const userService = {
    getUser : () : Promise<User> => http.get<User>("/user/get-user-by-id").then(res => res.data)
}