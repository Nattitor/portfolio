"use client";

import { motion, useSpring } from "framer-motion";
import React, { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  // Configured with heavy, industrial spring physics
  const x = useSpring(0, { stiffness: 350, damping: 25, mass: 0.5 });
  const y = useSpring(0, { stiffness: 350, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Distance from the center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Apply magnetic pull strength
    x.set(middleX * 0.35);
    y.set(middleY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.a
        href={href}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y }}
        className={`inline-block transition-transform duration-300 ease-out active:scale-95 ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.button>
  );
}
