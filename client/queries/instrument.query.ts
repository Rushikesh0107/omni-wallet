import { instrumentService } from "@/services/instrument.service";
import { ApiError } from "@/types/api";
import { Card } from "@/types/card";
import { useMutation } from "@tanstack/react-query";    
import { toast } from "sonner";

export const useAddCard = () =>
  useMutation<unknown, ApiError, Card>({
    mutationKey: ["add-card"],
    mutationFn: instrumentService.addCard,
    onSuccess : () => {
        toast.success("Card added successfully");
    },
    onError : () => {
        toast.error("Something went wrong");
    }
  });
