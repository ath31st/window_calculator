import { useState, useRef, useEffect } from 'react';
import { TableButton } from '@/types/api';
import { ButtonType } from '@/constants/button.type';

interface UseTableButtonStateProps {
  tableButtons: TableButton[];
  buttonType: ButtonType;
  tableId: number;
  onChange: (buttonType: ButtonType, id: number, value: number) => void;
}

export const useTableButtonState = ({
  tableButtons,
  buttonType,
  tableId,
  onChange,
}: UseTableButtonStateProps) => {
  const isModifier = buttonType === 'MODIFIER';
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const initializedRef = useRef(false);
  const prevSelectedCheckboxes = useRef<number[]>([]);

  useEffect(() => {
    if (isModifier && tableButtons.length > 0 && !initializedRef.current) {
      const firstButtonId = tableButtons[0].id;
      setSelectedButton(firstButtonId);
      const selectedValue = tableButtons[0].value || 1;
      onChange(buttonType, tableId, selectedValue);

      initializedRef.current = true;
    }
  }, [isModifier, tableButtons, buttonType, tableId, onChange]);

  const handleRadioChange = (id: number) => {
    setSelectedButton(id);
    const selectedValue = tableButtons.find((btn) => btn.id === id)?.value || 1;
    onChange(buttonType, tableId, selectedValue);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((cbId) => cbId !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (!isModifier) {
      if (selectedCheckboxes !== prevSelectedCheckboxes.current) {
        const totalValue = selectedCheckboxes
          .map(
            (cbId) => tableButtons.find((btn) => btn.id === cbId)?.value || 0,
          )
          .reduce((sum, value) => sum + value, 0);
        onChange(buttonType, tableId, totalValue);
        prevSelectedCheckboxes.current = selectedCheckboxes;
      }
    }
  }, [
    buttonType,
    isModifier,
    selectedCheckboxes,
    tableId,
    onChange,
    tableButtons,
  ]);

  return {
    selectedButton,
    selectedCheckboxes,
    handleRadioChange,
    handleCheckboxChange,
  };
};
