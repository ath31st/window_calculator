'use client';

import { useFrameBlockStore } from '@/stores/frame.block.store';
import { useFrameStore } from '@/stores/frame.store';
import FrameCard from '@/components/cards/FrameCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CommonLayout from '@/components/layouts/CommonLayout';

const Home: React.FC = () => {
  const { addFrameBlock, frameBlocksFull, deleteFrameBlock, updateFrameBlock } =
    useFrameBlockStore();
  const { activeFrameId } = useFrameStore();
  return (
    <CommonLayout>
      <Header />
      <FrameCard
        activeFrameId={activeFrameId}
        frameBlocksFull={frameBlocksFull}
        onAdd={(newFrameBlock) => addFrameBlock(newFrameBlock)}
        onDelete={(id) => deleteFrameBlock(id)}
        onEdit={(block) => updateFrameBlock(block)}
      />
      <Footer />
    </CommonLayout>
  );
};

export default Home;
