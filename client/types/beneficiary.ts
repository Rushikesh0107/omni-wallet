export type AddBeneficiaryPayload = {
    name: string;
    phoneNumber: string;
}

export type Beneficiary = {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  createdAt: string; // ISO string from backend
  updatedAt: string; // ISO string from backend
};
