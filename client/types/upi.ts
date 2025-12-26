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
  qrCode: string;
};

export type UpiPayload = {
    upiId: string;
    upiName: string;
    upiPhone: string;
}