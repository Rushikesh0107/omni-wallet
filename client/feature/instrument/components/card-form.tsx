"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddCard } from "@/queries/instrument.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const cardFormSchema = z.object({
  bankName: z.string({message: "Bank name is required"}).min(1, {message: "Bank name must be at least 1 character"}).max(100, {message: "Bank name must be at most 100 characters"}),
  cardNumber: z.string({message: "Card number is required"}).min(16, {message: "Card number must be 16 digits"}).max(16, {message: "Card number must be 16 digits"}),
  fullName: z.string({message: "Card holder name is required"}).min(1, {message: "Card holder name must be at least 1 character"}).max(100, {message: "Card holder name must be at most 100 characters"}),
  expiryMonth: z.string({message: "Expiry month is required"}).min(1, {message: "Expiry month must be at least 1 character"}).max(2, {message: "Expiry month must be at most 2 characters"}),
  expiryYear: z.string({message: "Expiry year is required"}).min(1, {message: "Expiry year must be at least 1 character"}).max(4, {message: "Expiry year must be at most 4 characters"}),
  cvv: z.string({message: "CVV is required"}).min(1, {message: "CVV must be at least 1 character"}).max(3, {message: "CVV must be at most 3 characters"}),
});

const CardForm = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      bankName: "",
      cardNumber: "",
      fullName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
    mode: "onChange",
  });

  const router = useRouter()

  const { mutate : addCard, isPending : isAddCardPending } = useAddCard()

  const onSubmit = (data: z.infer<typeof cardFormSchema>) => {
    const payload = {
      ...data,
      cardType: type === "credit-card" ? "CREDIT" : "DEBIT",
    };
    addCard(payload)
    router.back();
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h1 className="text-xl font-semibold text-center mb-3">{`Add ${type}`}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller 
                name="bankName"
                control={form.control}
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Bank name</FieldLabel>
                        <Input 
                        {...field}
                        placeholder="Bank name"
                        id="bank-name"
                        aria-invalid={form.formState.errors.bankName ? true : false}
                        />
                        {form.formState.errors.bankName && (
                            <FieldError errors={[form.formState.errors.bankName]} />
                        )}
                    </Field>
                )}
                />

                <Controller 
                name="cardNumber"
                control={form.control}
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Card number</FieldLabel>
                        <Input 
                        {...field}
                        type="number"
                        placeholder="Card number"
                        id="card-number"
                        aria-invalid={form.formState.errors.cardNumber ? true : false}
                        onChange={(e) => {
                            if(e.target.value.length <= 16){
                                field.onChange(e.target.value.replace(/[^0-9]/g, ''));
                            }
                        }}
                        />
                        {form.formState.errors.cardNumber && (
                            <FieldError errors={[form.formState.errors.cardNumber]} />
                        )}
                    </Field>
                )}
                />

                <Controller
                name="fullName"
                control={form.control}
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Card holder name</FieldLabel>
                        <Input 
                        {...field}
                        onChange={(e) => {
                            field.onChange(e.target.value.replace(/[^a-zA-Z ]/g, ''));
                        }}
                        placeholder="Card holder name"
                        id="card-holder-name"
                        aria-invalid={form.formState.errors.fullName ? true : false}
                        />
                        {form.formState.errors.fullName && (
                            <FieldError errors={[form.formState.errors.fullName]} />
                        )}
                    </Field>
                )}
                />

                <Controller
                name="expiryMonth"
                control={form.control}
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Expiry month</FieldLabel>
                        <Input 
                        {...field}
                        placeholder="Expiry month (MM)"
                        id="expiry-month"
                        aria-invalid={form.formState.errors.expiryMonth ? true : false}
                        onChange={(e) => {
                            if(e.target.value.length <= 2 && Number(e.target.value) <= 12 && e.target.value !== "00"){
                                field.onChange(e.target.value)
                            }
                        }}
                        />
                        {form.formState.errors.expiryMonth && (
                            <FieldError errors={[form.formState.errors.expiryMonth]} />
                        )}
                    </Field>
                )}
                />

                <Controller
                name="expiryYear"
                control={form.control}
                render={({ field }) => (
                    <Field>
                        <FieldLabel>Expiry year</FieldLabel>
                        <Input 
                        {...field}
                        placeholder="Expiry year (YYYY)"
                        id="expiry-year"
                        aria-invalid={form.formState.errors.expiryYear ? true : false}
                        onChange={(e) => {
                            if(e.target.value.length <= 4){
                                field.onChange(e.target.value)
                            }
                        }}
                        />
                        {form.formState.errors.expiryYear && (
                            <FieldError errors={[form.formState.errors.expiryYear]} />
                        )}
                    </Field>
                )}
                />

                <Controller
                name="cvv"
                control={form.control}
                render={({ field }) => (
                    <Field>
                        <FieldLabel>CVV</FieldLabel>
                        <Input  
                        {...field}
                        placeholder="CVV (3 digits)"
                        type="password"
                        id="cvv"
                        aria-invalid={form.formState.errors.cvv ? true : false}
                        />
                        {form.formState.errors.cvv && (
                            <FieldError errors={[form.formState.errors.cvv]} />
                        )}
                    </Field>
                )}
                />
            </FieldGroup>

            <Button type="submit" className="w-full justify-center items-center mt-5" disabled={isAddCardPending}>
                Add card
            </Button>
        </form>
      </Form>
    </div>
  );
};

export default CardForm;
