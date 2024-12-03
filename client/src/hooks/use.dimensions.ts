import { useState } from 'react';

export const useDimensions = () => {
  const [widthInMM, setWidthInMM] = useState<number>(0);
  const [heightInMM, setHeightInMM] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const handleDimensionChange = (
    key: 'width' | 'height' | 'multiplier',
    value: string,
  ) => {
    const numericValue = parseInt(value, 10) || 0;
    if (key === 'width') {
      setWidthInMM(numericValue);
    } else if (key === 'height') {
      setHeightInMM(numericValue);
    } else if (key === 'multiplier') {
      setMultiplier(numericValue);
    }
  };

  return { widthInMM, heightInMM, multiplier, handleDimensionChange };
};
