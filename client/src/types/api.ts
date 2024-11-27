import { ButtonType } from '@/constants/button.type';

// frame types

export interface Frame {
  id: number;
  name: string;
}

export interface NewFrame {
  name: string;
}

export interface FrameFull {
  id: number;
  name: string;
  frameBlocks: FrameBlockFull[];
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

export interface FrameBlockFull {
  id: number;
  name: string;
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  description: string;
  tables: BlockTableFull[];
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

export interface BlockTableFull {
  id: number;
  name: string;
  buttonType: ButtonType;
  buttons: TableButton[];
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
