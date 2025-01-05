'use client';

import React, { useEffect, useRef } from 'react';

const InfiniteBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY;
        backgroundRef.current.style.backgroundPositionY = `${scrollY % window.innerHeight}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
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
      }}
    />
  );
};

export default InfiniteBackground;
