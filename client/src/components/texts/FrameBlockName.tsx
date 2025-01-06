import theme from '@/app/_theme/theme';
import { Typography } from '@mui/material';

interface FrameBlockNameProps {
  name: string;
}

const FrameBlockName: React.FC<FrameBlockNameProps> = ({ name }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        background: `linear-gradient(90deg,${theme.palette.secondary.main}, transparent 90%)`,
        padding: '4px 12px',
        borderRadius: theme.shape.borderRadius,
        display: 'inline-block',
      }}
    >
      {name}
    </Typography>
  );
};

export default FrameBlockName;
