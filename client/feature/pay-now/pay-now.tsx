"use client";

import { useGetBeneficiary } from "@/queries/beneficiary.query";
import { useGetUser } from "@/queries/user.query";
import { usePayNow } from "@/queries/transaction.query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Form, FormControl } from "@/components/ui/form";

import { CardInstrument } from "@/types/card";
import { UPIInstrument } from "@/types/upi";
import { toast } from "sonner";
import { ApiError } from "@/types/api";
import { useRouter } from "next/navigation";
import { Transaction } from "@/types/transaction";

const PayFormSchema = z.object({
  amount: z.number().min(1),
  beneficiaryId: z.string().min(1),
  cardInstrumentId: z.string().optional(),
  upiInstrumentId: z.string().optional(),
});

const PayNow = () => {
  const { data: beneficiaries } = useGetBeneficiary();
  const { data: user } = useGetUser();
  const { mutate: payNow } = usePayNow();
  const router = useRouter();

  const cardInstruments = (user?.cardInstruments as CardInstrument[]) || [];
  const upiInstruments = (user?.upiInstruments as UPIInstrument[]) || [];

  const form = useForm<z.infer<typeof PayFormSchema>>({
    resolver: zodResolver(PayFormSchema),
    defaultValues: {
      amount: 0,
      beneficiaryId: "",
      cardInstrumentId: undefined,
      upiInstrumentId: undefined,
    },
  });

  const watchedAmount = form.watch("amount");

  const handleInstrumentChange = (id: string) => {
    const isCard = cardInstruments.some((c) => c.id === id);
    const isUpi = upiInstruments.some((u) => u.id === id);

    if (isCard) {
      form.setValue("cardInstrumentId", id);
      form.setValue("upiInstrumentId", undefined);
    }

    if (isUpi) {
      form.setValue("upiInstrumentId", id);
      form.setValue("cardInstrumentId", undefined);
    }
  };


  const onSubmit = (data: z.infer<typeof PayFormSchema>) => {
    const payload = {
      amount: Number(data.amount),
      beneficiaryId: data.beneficiaryId,
      cardDetails: data.cardInstrumentId || null,
      upiDetails: data.upiInstrumentId || null,
    };

    if (!payload.cardDetails && !payload.upiDetails) {
      return toast.error("Please select a payment method");
    }

    payNow(payload, {
      onSuccess: (response: Transaction) => {
        if (response.status === "SUCCESS") {
          toast.success("Transaction successful!");
          router.push("/transactions");
        } else {
          console.log(response);
          toast.error("Transaction failed");
        }
      },
      onError: (error: ApiError) => {
        toast.error(error.message);
      },
    });
  };


  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full mx-auto p-4">
      <div className="flex-1 p-12 bg-slate-50 rounded-3xl border-dashed border-2 text-center">
        <span className="text-slate-400 font-bold uppercase text-sm">
          Total Payable
        </span>
        <h1 className="text-7xl font-black mt-2">₹ {watchedAmount || 0}</h1>
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-xl border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-5">
              <Controller
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Amount</FieldLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        ₹
                      </span>
                      <Input
                        {...field}
                        type="number"
                        className="pl-8"
                        value={field.value === 0 ? "" : field.value} // Prevents "0" sticking in input
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                    <FieldError errors={[form.formState.errors.amount]} />
                  </Field>
                )}
              />

              <Controller
                name="beneficiaryId"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Beneficiary</FieldLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select beneficiary" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="mt-12">
                        {beneficiaries?.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Field>
                <FieldLabel>Payment Method</FieldLabel>
                <Select onValueChange={handleInstrumentChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Card or UPI" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="mt-12">
                    {cardInstruments.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        💳 {c.bankName}
                      </SelectItem>
                    ))}
                    {upiInstruments.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        📱 {u.upiId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            <Button type="submit" className="w-full mt-8">
              Pay Now
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PayNow;
