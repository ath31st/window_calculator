'use client';

import { useFrameBlockStore } from '@/stores/frame.block.store';
import { useFrameStore } from '@/stores/frame.store';
import FrameCard from '@/components/cards/FrameCard';

const Home: React.FC = () => {
  const { addFrameBlock, frameBlocksFull, deleteFrameBlock, updateFrameBlock } =
    useFrameBlockStore();
  const { activeFrameId } = useFrameStore();
  return (
    <FrameCard
      activeFrameId={activeFrameId}
      frameBlocksFull={frameBlocksFull}
      onAdd={(newFrameBlock) => addFrameBlock(newFrameBlock)}
      onDelete={(id) => deleteFrameBlock(id)}
      onEdit={(block) => updateFrameBlock(block)}
    />
  );
};

export default Home;
