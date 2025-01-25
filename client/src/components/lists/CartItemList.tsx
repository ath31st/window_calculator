import { CartItem } from '@/types/models';
import { Box } from '@mui/material';
import CartItemCard from '../cards/CartItemCard';

interface CartItemListProps {
  items: CartItem[];
  onRemove: (cartItemId: number) => void;
  onNoteChange: (id: number, note: string) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  items,
  onRemove,
  onNoteChange,
}) => {
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
        <CartItemCard
          key={item.id}
          item={item}
          onRemove={onRemove}
          onNoteChange={onNoteChange}
        />
      ))}
    </Box>
  );
};

export default CartItemList;
