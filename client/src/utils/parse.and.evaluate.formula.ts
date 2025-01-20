import validateTableIdsInFormula from './validate.table.ids.in.formula';

const parseAndEvaluateFormula = (
  formula: string,
  tableValues: Record<number, number>,
  multiplier: number,
  areaInSquareMeters: number,
): number => {
  try {
    const availableTableIds = Object.keys(tableValues).map(Number);
    const validationResult = validateTableIdsInFormula(
      formula,
      availableTableIds,
    );

    if (!validationResult.isValid) {
      return NaN;
    }

    let parsedFormula = formula.replace(/\d+/g, (match) => {
      const tableId = parseInt(match, 10);
      return tableValues[tableId].toString();
    });

    parsedFormula = parsedFormula
      .replace(/\b[mM]\b/g, multiplier.toString())
      .replace(/\b[sS]\b/g, areaInSquareMeters.toString());

    const result = eval(parsedFormula);
    return result > 0 ? Math.round(result) : 0;
  } catch (error) {
    console.error('Ошибка при вычислении формулы:', error);
    return NaN;
  }
};

export default parseAndEvaluateFormula;
