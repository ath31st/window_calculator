import DimensionField from '@/components/text.fields/DimensionField';
import { Box } from '@mui/material';

interface FrameBlockDimensionsProps {
  isWindowSizeEnabled: boolean;
  inputTitle: string;
  widthInMM: number;
  heightInMM: number;
  multiplier: number;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onMultiplierChange: (value: string) => void;
}

const FrameBlockDimensions: React.FC<FrameBlockDimensionsProps> = ({
  isWindowSizeEnabled,
  inputTitle,
  widthInMM,
  heightInMM,
  multiplier,
  onWidthChange,
  onHeightChange,
  onMultiplierChange,
}) => {
  return (
    <Box>
      {isWindowSizeEnabled ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <DimensionField
            label="Ширина (мм)"
            value={widthInMM}
            onChange={(e) => onWidthChange(e.target.value)}
          />
          <DimensionField
            label="Высота (мм)"
            value={heightInMM}
            onChange={(e) => onHeightChange(e.target.value)}
          />
        </Box>
      ) : (
        <DimensionField
          label={inputTitle}
          value={multiplier}
          onChange={(e) => onMultiplierChange(e.target.value)}
        />
      )}
    </Box>
  );
};

export default FrameBlockDimensions;
