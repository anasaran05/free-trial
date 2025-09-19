import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  image?: string;
  finishPercent?: number;
  onComplete?: () => void;
  children?: React.ReactNode;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  width,
  height,
  image,
  finishPercent = 70,
  onComplete,
  children,
  className = '',
  overlayColor = '#888',
  overlayOpacity = 0.8
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Create overlay image data
  const createOverlayImage = useCallback((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = parseInt(overlayColor.slice(1, 3), 16); // R
      data[i + 1] = parseInt(overlayColor.slice(3, 5), 16); // G
      data[i + 2] = parseInt(overlayColor.slice(5, 7), 16); // B
      data[i + 3] = 255 * overlayOpacity; // A
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [overlayColor, overlayOpacity, width, height]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = width;
    canvas.height = height;

    // Create overlay
    createOverlayImage(ctx);

    // Load and draw background image if provided
    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        // Redraw overlay on top
        createOverlayImage(ctx);
      };
      img.onerror = () => {
        // If image fails to load, create a default scratch area
        ctx.fillStyle = overlayColor;
        ctx.globalAlpha = overlayOpacity;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      };
      img.src = image;
    } else {
      // Default scratch area
      ctx.fillStyle = overlayColor;
      ctx.globalAlpha = overlayOpacity;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    }
  }, [image, createOverlayImage, width, height]);

  // Handle scratching
  const handleScratch = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!ctxRef.current || isComplete) return;

    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctxRef.current.globalCompositeOperation = 'destination-out';
    ctxRef.current.lineWidth = 30;
    ctxRef.current.lineCap = 'round';
    ctxRef.current.lineJoin = 'round';

    const startScratch = () => {
      setIsScratching(true);
      ctxRef.current?.beginPath();
      ctxRef.current?.moveTo(x, y);
    };

    const continueScratch = () => {
      if (!ctxRef.current) return;
      
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();

      // Calculate scratch percentage
      const imageData = ctxRef.current.getImageData(0, 0, width, height);
      const transparentPixels = imageData.data.filter((value, index) => 
        index % 4 === 3 && value < 128
      ).length;
      const totalPixels = width * height;
      const percentage = Math.round((transparentPixels / totalPixels) * 100);
      
      setScratchPercentage(percentage);

      // Check completion
      if (percentage >= finishPercent && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    };

    if ('touches' in e) {
      // Touch events
      if (e.type === 'touchstart') startScratch();
      else if (e.type === 'touchmove' && isScratching) continueScratch();
    } else {
      // Mouse events
      if (e.type === 'mousedown') startScratch();
      else if (e.type === 'mousemove' && isScratching) continueScratch();
    }
  }, [isComplete, isScratching, finishPercent, onComplete, width, height]);

  // Handle mouse/touch end
  const handleScratchEnd = useCallback(() => {
    setIsScratching(false);
    if (ctxRef.current) {
      ctxRef.current.closePath();
    }
  }, []);

  // Prevent scrolling on touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
  }, []);

  // Animation for completion
  useEffect(() => {
    if (isComplete && ctxRef.current) {
      // Animate full reveal
      const ctx = ctxRef.current;
      const animation = () => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.max(width, height), 0, 2 * Math.PI);
        ctx.fill();
      };
      
      const timer = setTimeout(animation, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, width, height]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width, height }}
      onMouseDown={handleScratch}
      onMouseMove={handleScratch}
      onMouseUp={handleScratchEnd}
      onMouseLeave={handleScratchEnd}
      onTouchStart={handleScratch}
      onTouchMove={handleScratch}
      onTouchEnd={handleScratchEnd}
      onTouchCancel={handleScratchEnd}
    >
      {/* Content Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          backgroundColor: 'transparent',
          zIndex: 1,
          opacity: isComplete ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        {children}
      </div>

      {/* Scratch Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded"
        style={{ 
          pointerEvents: 'none',
          zIndex: 2,
          borderRadius: 'inherit'
        }}
      />

      {/* Optional progress indicator */}
      {scratchPercentage > 0 && !isComplete && (
        <div 
          className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 transition-opacity duration-300"
          style={{ 
            opacity: isScratching ? 1 : 0,
            zIndex: 3
          }}
        >
          {scratchPercentage}%
        </div>
      )}

      {/* Completion overlay */}
      {isComplete && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded pointer-events-none flex items-center justify-center z-10"
          style={{ 
            animation: 'pulse 2s infinite',
            borderRadius: 'inherit'
          }}
        >
          <div className="text-white text-sm font-semibold text-center px-2">
            🎉 Revealed!
          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchCard;