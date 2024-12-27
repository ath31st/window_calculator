import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h3">{title}</Typography>
    </Box>
  );
};

export default PageHeader;
