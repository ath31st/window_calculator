import { Box, Typography } from '@mui/material';
import './page.header.css';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <div className="page-header">
        <Typography
          variant="h2"
          className="title-text"
        >
          {title}
        </Typography>
      </div>
    </Box>
  );
};

export default PageHeader;
