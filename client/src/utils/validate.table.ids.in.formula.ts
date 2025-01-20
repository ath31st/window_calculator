const validateTableIdsInFormula = (
  formula: string,
  availableTableIds: number[],
): { isValid: boolean; error?: string } => {
  const tableIdsInFormula = formula.match(/\d+/g)?.map(Number) || [];

  for (const tableId of tableIdsInFormula) {
    if (!availableTableIds.includes(tableId)) {
      return {
        isValid: false,
        error: `Используется недопустимый id таблицы: ${tableId}`,
      };
    }
  }

  return { isValid: true };
};

export default validateTableIdsInFormula;
