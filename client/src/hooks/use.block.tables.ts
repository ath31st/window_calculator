import useBlockTableStore from '@/stores/block.table.store';

export const useBlockTables = (
  selectedModifiers: Record<number, number>,
  setSelectedModifiers: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >,
  selectedValues: Record<number, number[]>,
  setSelectedValues: React.Dispatch<
    React.SetStateAction<Record<number, number[]>>
  >,
) => {
  const { blockTablesFull, addBlockTable, updateBlockTable, deleteBlockTable } =
    useBlockTableStore();

  const handleTableButtonChange = (
    buttonType: 'MODIFIER' | 'VALUE',
    tableId: number,
    value: number | number[],
  ) => {
    if (buttonType === 'MODIFIER') {
      setSelectedModifiers((prev) => ({
        ...prev,
        [tableId]: value as number,
      }));
    } else if (buttonType === 'VALUE') {
      setSelectedValues((prev) => ({
        ...prev,
        [tableId]: value as number[],
      }));
    }
  };

  return {
    blockTablesFull,
    addBlockTable,
    updateBlockTable,
    deleteBlockTable,
    handleTableButtonChange,
  };
};
