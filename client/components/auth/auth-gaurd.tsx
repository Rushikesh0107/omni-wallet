"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) {
      router.replace("/auth");
    }
  }, [isLoading, isError, router]);

  if (isLoading) return null;
  if (isError) return null;

  return <>{children}</>;
};
