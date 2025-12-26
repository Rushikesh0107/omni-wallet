"use client"

import { userService } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
    return useQuery({
        queryKey : ["user"],
        queryFn : () => userService.getUser(),
        staleTime : 5 * 60 * 1000,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchInterval : 5 * 60 * 1000,
        refetchIntervalInBackground : true,
    })
}