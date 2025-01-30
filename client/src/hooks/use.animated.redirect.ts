import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAnimatedRedirect = (path: string, delay = 1000) => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleRedirect = () => {
    setIsVisible(false);
    setTimeout(() => router.replace(path), delay);
  };

  return { isVisible, handleRedirect };
};
