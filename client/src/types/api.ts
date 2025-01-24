import { ButtonType } from '@/constants/button.type';

// frame types

export interface Frame {
  id: number;
  name: string;
  order: number;
}

export interface NewFrame {
  name: string;
  order: number;
}

export interface FrameFull {
  id: number;
  name: string;
  order: number;
  frameBlocks: FrameBlockFull[];
}

// frame block types

export interface FrameBlock {
  id: number;
  name: string;
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  description: string;
  formula: string;
}

export interface NewFrameBlock {
  frameId: number;
  name: string;
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  description: string;
}

export interface FrameBlockFull {
  id: number;
  name: string;
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  description: string;
  blockTables: BlockTableFull[];
  formula: string;
}

// block table types

export interface BlockTable {
  id: number;
  frameBlockId: number;
  name: string;
  buttonType: ButtonType;
}

export interface NewBlockTable {
  frameBlockId: number;
  name: string;
  buttonType: ButtonType;
}

export interface BlockTableFull {
  id: number;
  frameBlockId: number;
  name: string;
  buttonType: ButtonType;
  tableButtons: TableButton[];
}

// table button types

export interface TableButton {
  id: number;
  blockTableId: number;
  name: string;
  value: number;
}

export interface NewTableButton {
  blockTableId: number;
  name: string;
  value: number;
}

// user types

export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateUser {
  id: number;
  name: string;
  email: string;
  role: number;
  isActive: boolean;
}

export interface ChangePassword {
  id: number;
  oldPassword: string;
  newPassword: string;
}

// auth types

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshJwtRequest {
  refreshToken: string;
}

export interface Credentials {
  email: string;
  password: string;
}
