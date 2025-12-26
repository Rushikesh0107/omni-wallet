import { CardInstrument } from "./card";

/**
 * UPI instrument (currently empty in your response,
 * but defined for future extensibility)
 */
export type UPIInstrument = {
  id: string;
  userId: string;
  upiId: string;
  provider?: string;
  createdAt: string;
};

/**
 * User domain model
 */
export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  cardInstruments: CardInstrument[];
  upiInstruments: UPIInstrument[];
};