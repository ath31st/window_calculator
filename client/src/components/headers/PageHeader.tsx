import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          paddingY: 2,
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
