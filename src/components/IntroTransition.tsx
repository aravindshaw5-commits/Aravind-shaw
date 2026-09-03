import React, { useState, useEffect, useRef } from 'react';

interface IntroTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const IntroTransition: React.FC<IntroTransitionProps> = ({
  isActive,
  onComplete
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(6);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) return;

    setIsFadingOut(false);
    setSecondsRemaining(6);

    // Play video from the beginning
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });
        }
      } catch {
        // Safe fallback
      }
    }

    const startTime = Date.now();

    // 1-second countdown interval
    countdownIntervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const rem = Math.max(0, 6 - elapsed);
      setSecondsRemaining(rem);
    }, 200);

    // At 5.5s, start smooth visual fade-out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 5500);

    // At exactly 6.0s (6000ms), finish intro
    timerRef.current = setTimeout(() => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      onComplete();
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      id="intro-animation-overlay"
      className={`fixed inset-0 z-[99999] bg-[#00391E] flex items-center justify-center overflow-hidden select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity', backgroundColor: '#00391E' }}
    >
      {/* Full-screen video container with #00391E background */}
      <div
        className="relative w-full h-full flex items-center justify-center bg-[#00391E]"
        style={{ backgroundColor: '#00391E' }}
      >
        <video
          ref={videoRef}
          src="/Into Video Text Animation 02.mp4"
          playsInline
          autoPlay
          muted
          preload="auto"
          className="w-full h-full max-w-full max-h-full object-contain pointer-events-none bg-[#00391E]"
          style={{ backgroundColor: '#00391E' }}
          onEnded={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
            setIsFadingOut(true);
            setTimeout(onComplete, 300);
          }}
        />

        {/* Top Header: Branding Indicator */}
        <div className="absolute top-6 inset-x-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2.5 bg-[#00391E]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-100 uppercase">
              ARAVIND SHAW • PORTFOLIO
            </span>
          </div>

          {/* 6-Second Timer Indicator */}
          <div className="flex items-center gap-2 bg-[#00391E]/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-100 text-xs font-mono">
            <span className="text-emerald-400 font-bold">0:0{secondsRemaining}</span>
          </div>
        </div>

        {/* Bottom Bar: Loading Progress Line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-emerald-950/40">
          <div
            className="h-full bg-emerald-400 transition-all duration-300 ease-linear shadow-[0_0_10px_#34d399]"
            style={{
              width: `${((6 - secondsRemaining) / 6) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};
