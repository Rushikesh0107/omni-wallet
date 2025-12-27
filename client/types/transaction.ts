import { CardInstrument } from "@/types/card";
import { Beneficiary } from "@/types/beneficiary";
import { UPIInstrument } from "@/types/upi";

export type TransactionStatus = "SUCCESS" | "FAILED" | "PENDING";


export type Transaction = {
  id: string;
  userId: string;
  amount: string; 
  status: TransactionStatus;

  beneficiaryId: string;
  cardInstrumentId: string | null;
  upiInstrumentId: string | null;

  createdAt: string;
  updatedAt: string;

  cardInstrument: CardInstrument | null;
  upiInstrument: UPIInstrument | null;
  beneficiary: Beneficiary;
};

export type PayNowPayload = {
    amount: string;
    beneficiaryId: string;
    cardDetails: string;
    upiDetails: string;
}
