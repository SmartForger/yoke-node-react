import { Receipt } from "./Receipt";

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  receipts?: Receipt[];
}