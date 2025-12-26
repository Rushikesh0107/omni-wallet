// src/queries/auth.queries.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import type { ApiError } from "@/types/api";
import type {TSignUpPayload, TSignInPayload}  from "@/types/auth";


export const useSignUp = () =>
  useMutation<
    unknown,
    ApiError,
    TSignUpPayload
  >({
    mutationKey : ["sign-up"],
    mutationFn: authService.signUp,
  }); 
  
export const useSignIn = () =>
  useMutation<
    unknown,
    ApiError,
    TSignInPayload
  >({
    mutationKey : ["sign-in"],
    mutationFn: authService.signIn,
  });

