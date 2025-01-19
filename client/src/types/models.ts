export interface CartItem {
  id: number;
  blockId: number;
  name: string;
  summary: number;
}

export interface JwtUser {
  userId: number;
  name: string;
  email: string;
  role: string;
}
