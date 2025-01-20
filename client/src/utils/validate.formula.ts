const validateFormula = (
  formula: string,
): { isValid: boolean; error?: string } => {
  if (formula.trim().length === 0) {
    return { isValid: true };
  }

  const validCharacters = /^[\d\s+\-*/()mMsS]+$/;
  if (!validCharacters.test(formula)) {
    return {
      isValid: false,
      error:
        'Формула содержит недопустимые символы. Разрешены только цифры, операторы (+, -, *, /), скобки, m, M, s, S.',
    };
  }

  const stack: string[] = [];
  for (const char of formula) {
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.length === 0) {
        return {
          isValid: false,
          error: 'Несбалансированные скобки в формуле.',
        };
      }
      stack.pop();
    }
  }
  if (stack.length > 0) {
    return {
      isValid: false,
      error: 'Несбалансированные скобки в формуле.',
    };
  }

  const firstChar = formula.trim()[0];
  if (['+', '-', '*', '/'].includes(firstChar)) {
    return {
      isValid: false,
      error: 'Формула не может начинаться с оператора.',
    };
  }

  const lastChar = formula.trim().slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    return {
      isValid: false,
      error: 'Формула не может заканчиваться на оператор.',
    };
  }

  return { isValid: true };
};

export default validateFormula;
