
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircularCarousel } from './components/CircularCarousel';
import { CONFIG, MOCK_VIDEOS } from './constants';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { TikTokLogo } from './components/TikTokLogo';

const App: React.FC = () => {
  // 核心展示状态配置 - 已更新为截图中的精确数值
  const DEFAULT_CONFIG = {
    xOffset: 27,       
    yOffset: 15,       
    translateX: 20,    
    translateY: -7,   
    fanAngle: 14,     
    zOffset: 45,      
    overallTilt: -10,  
    scale: 0.85,      
    perspective: 2000,
    blurAmount: 15,
  };

  const [fanConfig, setFanConfig] = useState(DEFAULT_CONFIG);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setFanConfig({ ...DEFAULT_CONFIG });
    setResetKey(prev => prev + 1); // 强制重新触发 Entrance 动画
  };

  return (
    <div className="flex w-screen h-screen bg-[#000] text-zinc-100 overflow-hidden font-sans">
      {/* 手机容器 */}
      <div 
        className="relative flex flex-col bg-black overflow-hidden mx-auto shadow-[0_0_100px_rgba(0,0,0,1)]"
        style={{
          width: '100%',
          maxWidth: `${CONFIG.maxMobileWidth}px`,
          height: '100dvh', 
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#151515,transparent_70%)] pointer-events-none" />

        {/* Header Section */}
        <motion.header 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 pt-4 pl-4 pr-8 flex flex-col items-start pointer-events-none"
        >
          <div className="origin-left">
            <TikTokLogo />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h1 
              className="text-white font-semibold text-left tracking-tight"
              style={{ 
                fontSize: '40px', 
                lineHeight: '1.2' 
              }}
            >
              Download TikTok<br />
              <span className="text-white">make your day</span>
            </h1>
          </div>
        </motion.header>

        {/* Carousel Container */}
        <CircularCarousel 
          key={resetKey} 
          items={MOCK_VIDEOS} 
          config={fanConfig} 
          className="z-20"
        />

        {/* Effects Layers */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none z-30"
          style={{
            backdropFilter: `blur(${fanConfig.blurAmount}px)`,
            WebkitBackdropFilter: `blur(${fanConfig.blurAmount}px)`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%)'
          }}
        />

        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-40"
          style={{
            height: '240px',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 53.74%)',
          }}
        />

        {/* Footer CTA */}
        <motion.footer 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 pb-[8px] px-[32px] shrink-0"
        >
          <button className="w-full bg-[#ff2d55] h-[54px] rounded-full flex items-center justify-center gap-3 text-white font-semibold text-lg active:scale-95 transition-transform duration-100 shadow-none border-none outline-none">
            <span>Download App Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_cta_icon)">
                <path d="M10 0.833008C15.0626 0.833008 19.167 4.93739 19.167 10C19.167 15.0626 15.0626 19.167 10 19.167C4.93741 19.167 0.833033 15.0626 0.833008 10C0.833008 4.93739 4.93739 0.833008 10 0.833008ZM10.8838 5.53906C10.7211 5.37634 10.4576 5.37634 10.2949 5.53906L9.70508 6.12793C9.54262 6.29055 9.54275 6.5541 9.70508 6.7168L12.1553 9.16699H5.41699C5.18697 9.16699 5.00015 9.35302 5 9.58301V10.417C5.0002 10.6469 5.187 10.833 5.41699 10.833H12.1553L9.70508 13.2832C9.54277 13.4459 9.5426 13.7095 9.70508 13.8721L10.2949 14.4609C10.4576 14.6237 10.7211 14.6237 10.8838 14.4609L14.7559 10.5889C15.0811 10.2635 15.0811 9.73654 14.7559 9.41113L10.8838 5.53906Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_cta_icon">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </motion.footer>
      </div>

      {/* 桌面端配置面板 */}
      <aside className="hidden min-[1150px]:flex flex-col w-[320px] bg-[#0c0c0c] border-l border-zinc-800 p-0 text-white shrink-0 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/20">
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-[#ff2d55]" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Settings</h2>
          </div>
          <button onClick={handleReset} className="p-2.5 hover:bg-zinc-800 rounded-lg transition-all text-zinc-600 hover:text-white">
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-10">
          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Stacking Geometry</h3>
            <ControlItem label="X Overlap" value={fanConfig.xOffset} min={-100} max={600} onChange={(v) => setFanConfig(p => ({...p, xOffset: v}))} />
            <ControlItem label="Y Offset" value={fanConfig.yOffset} min={-200} max={200} onChange={(v) => setFanConfig(p => ({...p, yOffset: v}))} />
            <ControlItem label="Fan Angle" value={fanConfig.fanAngle} min={-60} max={60} unit="°" onChange={(v) => setFanConfig(p => ({...p, fanAngle: v}))} />
            <ControlItem label="Z Depth" value={fanConfig.zOffset} min={-100} max={300} onChange={(v) => setFanConfig(p => ({...p, zOffset: v}))} />
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Overall Positioning</h3>
            <ControlItem label="X Position" value={fanConfig.translateX} min={-400} max={400} onChange={(v) => setFanConfig(p => ({...p, translateX: v}))} />
            <ControlItem label="Y Position" value={fanConfig.translateY} min={-600} max={600} onChange={(v) => setFanConfig(p => ({...p, translateY: v}))} />
            <ControlItem label="Scale" value={fanConfig.scale} min={0.1} max={2.5} step={0.01} onChange={(v) => setFanConfig(p => ({...p, scale: v}))} />
            <ControlItem label="Overall Tilt" value={fanConfig.overallTilt} min={-90} max={90} unit="°" onChange={(v) => setFanConfig(p => ({...p, overallTilt: v}))} />
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Post Effects</h3>
            <ControlItem label="Blur Intensity" value={fanConfig.blurAmount} min={0} max={100} unit="px" onChange={(v) => setFanConfig(p => ({...p, blurAmount: v}))} />
            <ControlItem label="Perspective" value={fanConfig.perspective} min={500} max={4000} step={50} onChange={(v) => setFanConfig(p => ({...p, perspective: v}))} />
          </section>
        </div>
      </aside>
    </div>
  );
};

const ControlItem = ({ label, value, min, max, step = 1, unit = "", onChange }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[11px] font-bold">
      <span className="uppercase tracking-wider text-zinc-600">{label}</span>
      <span className="font-mono text-[#ff2d55]">{value}{unit}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))} 
      className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[#ff2d55]" 
    />
  </div>
);

export default App;
