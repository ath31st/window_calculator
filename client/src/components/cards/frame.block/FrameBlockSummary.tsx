import { Box, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import theme from '@/app/_theme/theme';
import { useCartStore } from '@/stores/cart.store';
import generateUniqueNumber from '@/utils/generate.unique.number';

interface FrameBlockSummaryProps {
  summary: number;
  blockId: number;
}

const FrameBlockSummary: React.FC<FrameBlockSummaryProps> = ({
  summary,
  blockId,
}) => {
  const { addToCart, countInCart } = useCartStore();

  const handleCartAction = () => {
    const cartItemId = generateUniqueNumber();
    addToCart({ id: cartItemId, blockId, name: '', summary });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        background: `linear-gradient(270deg,${theme.palette.secondary.main}, transparent 90%)`,
        padding: '4px 12px',
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Typography variant="body1">{`Стоимость: ${summary} ₽`}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {countInCart(blockId) > 0 && (
          <Typography variant="body1">
            {`В корзине: ${countInCart(blockId)}`}
          </Typography>
        )}
        <IconButton
          color="primary"
          onClick={handleCartAction}
          disabled={summary === 0}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FrameBlockSummary;
