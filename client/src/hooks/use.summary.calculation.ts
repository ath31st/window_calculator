import parseAndEvaluateFormula from '@/utils/parse.and.evaluate.formula';
import { useCallback } from 'react';

export const useSummaryCalculation = (
  selectedModifiers: Record<number, number>,
  selectedValues: Record<number, number[]>,
  multiplier: number,
  heightInMM: number,
  widthInMM: number,
  formula?: string,
) => {
  const calculateSummary = useCallback(() => {
    const areaInSquareMeters =
      heightInMM > 0 && widthInMM > 0
        ? Math.round(((heightInMM * widthInMM) / 1_000_000) * 10) / 10
        : 1;

    if (formula) {
      const tableValues: Record<number, number> = {};

      Object.entries(selectedModifiers).forEach(([tableId, value]) => {
        tableValues[parseInt(tableId, 10)] = value;
      });

      Object.entries(selectedValues).forEach(([tableId, values]) => {
        tableValues[parseInt(tableId, 10)] = Array.isArray(values)
          ? values.reduce((sum, value) => sum + value, 0)
          : values;
      });

      const rawResult = parseAndEvaluateFormula(
        formula,
        tableValues,
        multiplier,
        areaInSquareMeters,
      );
      return rawResult > 0 ? Math.round(rawResult) : 0;
    }

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

    const rawResult =
      modifierProduct * valueSum * multiplier * areaInSquareMeters;

    // return rawResult > 0 ? Math.max(100, Math.floor(rawResult / 100) * 100) : 0;
    return rawResult > 0 ? Math.round(rawResult) : 0;
  }, [
    formula,
    selectedModifiers,
    selectedValues,
    heightInMM,
    widthInMM,
    multiplier,
  ]);

  return calculateSummary;
};
