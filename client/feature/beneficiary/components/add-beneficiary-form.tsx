"use client";

import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {useRouter } from "next/navigation"
import { useAddBeneficiary } from "@/queries/beneficiary.query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters long.",
  }),
});

const AddBeneficiaryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });
  const router = useRouter();

  const { mutate : addBeneficiary, isPending } = useAddBeneficiary();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addBeneficiary(data);
    router.back();
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 max-w-4xl mx-auto w-full">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold mb-4">Add Beneficiary</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Name</FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Name"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                          field.onChange(
                            e.target.value.replace(/[^a-zA-Z ]/g, "")
                          );
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />

              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Phone Number</FieldLabel>
                      <Input
                        {...field}
                        id="phoneNumber"
                        type="number"
                        placeholder="Phone Number"
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                          if (e.target.value.length <= 10) {
                            field.onChange(e.target.value);
                          }
                        }}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <Button type="submit" className="w-full mt-5">
              Add Beneficiary
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBeneficiaryForm;
