
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { VideoItem } from '../types';

interface VideoCardProps {
  item: VideoItem;
  position: number;
  index: number;
  totalItems: number;
  config: {
    xOffset: number;
    yOffset: number;
    fanAngle: number;
    zOffset: number;
  };
}

export const VideoCard: React.FC<VideoCardProps> = ({ item, position, index, totalItems, config }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // 最终静态目标位置
  const targetX = position * config.xOffset;
  const targetY = position * config.yOffset;
  const targetRotateZ = position * config.fanAngle;
  const targetZ = position * config.zOffset;
  
  // 固定层级深度：中间卡片（position 0）最高
  const zIndex = 100 - Math.round(Math.abs(position) * 10);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    
    // 标记进场动画完成
    const totalEntranceTime = (totalItems * 0.18 + 0.8) * 1000;
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, totalEntranceTime);
    
    return () => clearTimeout(timer);
  }, [totalItems]);

  // 反向延迟：最右边先出。仅在进场阶段生效。
  const entryDelay = (totalItems - 1 - index) * 0.18;

  // 动画配置逻辑
  // 如果是中间卡片且已进场，应用呼吸感旋转动画
  const isCenter = position === 0;

  // ==================================================================================
  // LANDING ANIMATION CONFIGURATION - DO NOT CHANGE (LOCKED)
  // ----------------------------------------------------------------------------------
  // 这是一个经过调试确认的完美 Landing 动画参数组合。
  // 请勿修改以下数值，以保持当前的进场体验。
  //
  // 1. Initial State (起始状态):
  //    scale: 0, x: -400, y: 600, rotateZ: -100, opacity: 0, z: -2000, blur: 20px
  //
  // 2. Transition Physics (物理参数):
  //    stiffness: 75, damping: 20, mass: 1
  //
  // 3. Timing (时序):
  //    entryDelay calculation: (totalItems - 1 - index) * 0.18
  // ==================================================================================

  return (
    <motion.div
      // 初始状态 [LANDING - DO NOT CHANGE]
      initial={{ 
        scale: 0, 
        x: -400, 
        y: 600,
        rotateZ: -100, 
        opacity: 0,
        z: -2000,
        filter: 'blur(20px)'
      }}
      // 动画至展示位置
      animate={{
        scale: 1,
        x: targetX,
        opacity: 1,
        filter: 'blur(0px)',
        z: targetZ,
        rotateZ: targetRotateZ,
        y: targetY,
      }}
      transition={{
        // 基础进场/属性切换
        type: 'spring',
        // [LANDING] stiffness: 75, damping: 20 (when !hasEntered)
        stiffness: hasEntered ? 150 : 75, 
        damping: hasEntered ? 30 : 20,
        mass: 1,
        delay: hasEntered ? 0 : entryDelay,
        restDelta: 0.001
      }}
      className="absolute w-[82%] aspect-[9/16] rounded-[32px] overflow-hidden select-none"
      style={{
        zIndex, 
        transformOrigin: '50% 250%', 
        transformStyle: 'preserve-3d',
        background: 'transparent', // 移除黑色背景消除黑边
        boxShadow: '0 30px 90px -20px rgba(0,0,0,0.8)', // 优化阴影使边缘更柔和
        border: 'none'
      }}
    >
      <div className="absolute inset-0">
        <video 
          ref={videoRef}
          src={item.videoUrl} 
          className="w-full h-full object-cover pointer-events-none scale-[1.01]" // 微量缩放确保无间隙
          autoPlay
          loop
          muted
          playsInline
        />
        {/* 玻璃面层光泽 */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none opacity-30" />
      </div>
    </motion.div>
  );
};
