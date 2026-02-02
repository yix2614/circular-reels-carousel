
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { VideoItem } from '../types';
import { VideoCard } from './VideoCard';

interface CircularCarouselProps {
  items: VideoItem[];
  config: {
    xOffset: number;
    yOffset: number;
    translateX: number;
    translateY: number;
    fanAngle: number;
    zOffset: number;
    overallTilt: number;
    scale: number;
    perspective: number;
  };
}

export const CircularCarousel: React.FC<CircularCarouselProps> = ({ items, config }) => {
  const centerIndex = Math.floor(items.length / 2);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const totalEntranceTime = (items.length * 0.18 + 0.8) * 1000;
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, totalEntranceTime);

    return () => clearTimeout(timer);
  }, [items.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible pointer-events-none select-none">
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        animate={{ 
          rotate: config.overallTilt,
          scale: config.scale,
          x: config.translateX,
          y: config.translateY
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 70, 
          damping: 22, 
          mass: 1.2,
          restDelta: 0.001
        }}
        style={{ 
          perspective: `${config.perspective}px`,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={{ rotate: hasEntered ? [0, 360] : 0 }}
          transition={{
            rotate: hasEntered
              ? { repeat: Infinity, duration: 180, ease: 'linear' }
              : undefined
          }}
          style={{ transformOrigin: '50% 300%' }}
        >
          {items.map((item, i) => {
            const position = i - centerIndex;
            return (
              <VideoCard
                key={item.id}
                item={item}
                position={position}
                index={i}
                totalItems={items.length}
                config={config}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};
