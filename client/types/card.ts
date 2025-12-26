/**
 * Card type supported by the system
 * Keep this in sync with backend enum
 */
export enum CardType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

/**
 * Card instrument attached to a user
 * NOTE:
 * - cardNumber & cvv are strings on purpose
 * - Never treat these as numbers
 */
export type CardInstrument = {
  id: string;
  userId: string;
  cardType: CardType;
  bankName: string;
  fullName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

export type CardPayload = {
  bankName: string;
  cardNumber: string;
  fullName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}