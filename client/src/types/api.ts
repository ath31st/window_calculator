import { ButtonType } from '@/constants/button.type';

// frame types

export interface Frame {
  id: number;
  name: string;
}

export interface NewFrame {
  name: string;
}

// frame block types

export interface FrameBlock {
  id: number;
  name: string;
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  description: string;
}

export interface NewFrameBlock {
  frameId: number;
  name: string;
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  description: string;
}

// block table types

export interface BlockTable {
  id: number;
  name: string;
  buttonType: ButtonType;
}

export interface NewBlockTable {
  frameBlockId: number;
  name: string;
  buttonType: ButtonType;
}

// table button types

export interface TableButton {
  id: number;
  name: string;
  value: string;
}

export interface NewTableButton {
  blockTableId: number;
  name: string;
  value: string;
}
