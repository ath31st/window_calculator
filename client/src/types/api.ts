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
  blockTables: BlockTableFull[];
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
