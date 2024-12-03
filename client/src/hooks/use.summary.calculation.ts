import { useCallback } from 'react';

export const useSummaryCalculation = (
  selectedModifiers: Record<number, number>,
  selectedValues: Record<number, number[]>,
  multiplier: number,
) => {
  const calculateSummary = useCallback(() => {
    let modifierProduct = 1;
    let valueSum = 0;

    Object.values(selectedModifiers).forEach((value) => {
      modifierProduct *= value;
    });

    Object.values(selectedValues).forEach((values) => {
      if (Array.isArray(values)) {
        valueSum += values.reduce((sum, value) => sum + value, 0);
      } else if (typeof values === 'number') {
        valueSum += values;
      }
    });

    return modifierProduct * valueSum * multiplier;
  }, [selectedModifiers, selectedValues, multiplier]);

  return calculateSummary;
};
