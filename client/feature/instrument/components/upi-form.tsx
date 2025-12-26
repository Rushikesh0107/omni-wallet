"use client";

import UpiPreview from "@/components/common/upi-preview";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddUpi } from "@/queries/instrument.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";

const UPIFormSchema = z.object({
  upiId: z.string().min(1, "UPI ID is required"),
  upiName: z.string().min(1, "UPI Name is required"),
  upiPhone: z
    .string()
    .min(10, "UPI Phone Number at least 10 digits")
    .max(10, "UPI Phone Number at most 10 digits"),
});

const UPIForm = () => {
  const [upiId, setUpiId] = useState<string>("");
  const form = useForm({
    resolver: zodResolver(UPIFormSchema),
    defaultValues: {
      upiId: "",
      upiName: "",
      upiPhone: "",
    },
    mode: "onChange",
  });

  const { mutate : addUpi, isPending } = useAddUpi();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof UPIFormSchema>) => {
    addUpi(data);
    router.back();
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 max-w-4xl mx-auto w-full">
      <UpiPreview qrcode={"/qr_code.png"} upiId={upiId} />
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold mb-4">Add UPI</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="upiId"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Input
                      {...field}
                      placeholder="UPI ID"
                      type="text"
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                    {form.formState.errors.upiId && (
                      <FieldError errors={[form.formState.errors.upiId]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="upiName"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Input
                      {...field}
                      placeholder="UPI Name"
                      type="text"
                      onChange={(e) => {
                        field.onChange(
                          e.target.value.replace(/[^a-zA-Z ]/g, "")
                        );
                      }}
                    />
                    {form.formState.errors.upiName && (
                      <FieldError errors={[form.formState.errors.upiName]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="upiPhone"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Input
                      {...field}
                      placeholder="UPI Phone Number"
                      type="number"
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                    {form.formState.errors.upiPhone && (
                      <FieldError errors={[form.formState.errors.upiPhone]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button type="submit" className="w-full mt-5" disabled={isPending}>
              Add UPI
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UPIForm;
