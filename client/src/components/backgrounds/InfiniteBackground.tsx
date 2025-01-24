'use client';

import React, { useEffect, useRef, useState } from 'react';
import PageLoader from '../loaders/PageLoader';

const InfiniteBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY;
        backgroundRef.current.style.backgroundPositionY = `-${scrollY % window.innerHeight}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [imageUrl]);

  return (
    <>
      {isLoading && <PageLoader />}

      <div
        ref={backgroundRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-y',
          zIndex: -1,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </>
  );
};

export default InfiniteBackground;
