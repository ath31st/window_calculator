export interface CartItem {
  blockId: number;
  name: string;
  summary: number;
}

export interface JwtUser {
  userId: string;
  email: string | null;
  role: string;
}
