import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { cloneElement } from 'react';
import theme from '@/app/_theme/theme';

interface CommonAddIconButtonProps {
  isEditMode: boolean;
  customIcon: React.ReactElement;
  onAddClick: () => void;
  iconSize?: number;
}

const CommonAddIconButton: React.FC<CommonAddIconButtonProps> = ({
  isEditMode,
  customIcon,
  onAddClick,
  iconSize = 1,
}) => {
  if (!isEditMode) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      }}
    >
      <IconButton onClick={onAddClick}>
        <AddIcon sx={{ fontSize: iconSize }} />{' '}
      </IconButton>

      {cloneElement(customIcon, {
        sx: { fontSize: iconSize, color: theme.palette.secondary.main },
      })}
    </Box>
  );
};

export default CommonAddIconButton;
