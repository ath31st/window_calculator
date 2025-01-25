export interface CartItem {
  id: number;
  blockId: number;
  name: string;
  summary: number;
  note?: string;
}

export interface JwtUser {
  userId: number;
  name: string;
  email: string;
  role: string;
}
