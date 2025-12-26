import { http } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await http.get("/auth/me");
      return res.data;
    },
    retry: false,
  });
