import React from 'react';
import { TextField } from '@mui/material';
import theme from '@/app/_theme/theme';

interface DimensionFieldProps {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DimensionField: React.FC<DimensionFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      fullWidth
      slotProps={{
        input: {
          sx: {
            borderRadius: theme.shape.borderRadius,
          },
          inputProps: {
            min: 1,
          },
        },
      }}
    />
  );
};

export default DimensionField;
