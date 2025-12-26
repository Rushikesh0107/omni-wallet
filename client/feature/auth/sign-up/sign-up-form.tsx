"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/queries/auth.query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = (): React.ReactNode => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending, error } = useSignUp();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("User signed up successfully");
        router.replace("/");
      },
      onError : () => {
        toast.error("User signed up failed");
      }
    });
  };

  return (
    <div>
      <h1 className="text-base font-normal text-center text-accent">
        {`If you don't have an account, sign up`}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email-field">
                    Email ID
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email-field"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email ID"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password-field">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password-field"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {error && (
            <p className="text-red-500 text-sm">
              {error.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
