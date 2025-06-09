
import { ReactNode, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Rotating3DProps {
  className?: string;
  children: ReactNode;
  intensity?: number;
  perspective?: number;
  resetOnLeave?: boolean;
}

export function Rotating3D({
  className,
  children,
  intensity = 10,
  perspective = 1000,
  resetOnLeave = true
}: Rotating3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Calculate rotation based on mouse position relative to center
    const rotateYValue = ((mouseX - centerX) / (width / 2)) * intensity;
    const rotateXValue = -((mouseY - centerY) / (height / 2)) * intensity;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    if (resetOnLeave) {
      setRotateX(0);
      setRotateY(0);
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
