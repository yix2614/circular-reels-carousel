
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
            const distanceFromCenter = Math.abs(position);
            
            // 优化逻辑：
            // 1. 仅播放正中间 (0) 和左右相邻 (±1) 的视频，共3个
            const shouldPlay = distanceFromCenter <= 1;
            
            // 2. 预加载策略：
            // - 距离 <= 2 (中心5个视频): 'auto' (加载数据以备播放)
            // - 其他视频: 'metadata' (仅加载首帧，防止白屏，但不下载视频流)
            const preloadMode = distanceFromCenter <= 2 ? 'auto' : 'metadata';

            return (
              <VideoCard
                key={item.id}
                item={item}
                position={position}
                index={i}
                totalItems={items.length}
                config={config}
                shouldPlay={shouldPlay}
                preloadMode={preloadMode}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};
