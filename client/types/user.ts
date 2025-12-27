import { CardInstrument } from "./card";
import { UPIInstrument } from "./upi";

/**
 * User domain model
 */
export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  cardInstruments: CardInstrument[];
  upiInstruments: UPIInstrument[];
};