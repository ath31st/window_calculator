'use client';

import { useFrameBlockStore } from '@/stores/frame.block.store';
import { useFrameStore } from '@/stores/frame.store';
import FrameCard from '@/components/cards/FrameCard';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  const { addFrameBlock, frameBlocksFull, deleteFrameBlock, updateFrameBlock } =
    useFrameBlockStore();
  const { activeFrameId } = useFrameStore();
  return (
    <>
      <FrameCard
        activeFrameId={activeFrameId}
        frameBlocksFull={frameBlocksFull}
        onAdd={(newFrameBlock) => addFrameBlock(newFrameBlock)}
        onDelete={(id) => deleteFrameBlock(id)}
        onEdit={(block) => updateFrameBlock(block)}
      />
      <Footer />
    </>
  );
};

export default Home;
