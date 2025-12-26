"use client";

import { instrumentService } from "@/services/instrument.service";
import { ApiError } from "@/types/api";
import { CardPayload } from "@/types/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddCard = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CardPayload>({
    mutationKey: ["add-card"],
    mutationFn: instrumentService.addCard,

    onSuccess: () => {
      toast.success("Card added successfully");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });
};
