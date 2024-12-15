export interface CartItem {
  blockId: number;
  name: string;
  summary: number;
}

export interface JwtUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}
