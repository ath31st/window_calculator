import { CartItem } from '@/types/models';
import { Box } from '@mui/material';
import CartItemCard from '../cards/CartItemCard';

interface CartItemListProps {
  items: CartItem[];
  onRemove: (blockId: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ items, onRemove }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
        overflowY: 'auto',
      }}
    >
      {items.map((item) => (
        <CartItemCard key={item.blockId} item={item} onRemove={onRemove} />
      ))}
    </Box>
  );
};

export default CartItemList;
