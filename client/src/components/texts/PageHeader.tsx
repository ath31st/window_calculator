import theme from '@/app/_theme/theme';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      <Typography
        variant="h3"
        sx={{
          width: '100%',
          background: `linear-gradient(90deg,${theme.palette.secondary.main}, transparent 90%)`,
          padding: '6px 16px',
          borderRadius: theme.shape.borderRadius,
          display: 'inline-block',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
