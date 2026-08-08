"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const touchCheck = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouchDevice(touchCheck.matches);
    if (touchCheck.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnterInteractive = () => setIsHovering(true);
    const handleMouseLeaveInteractive = () => setIsHovering(false);

    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, label[for]';

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelectors).forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    addListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: position.x - (isHovering ? 20 : 4), y: position.y - (isHovering ? 20 : 4) }}
        animate={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        <div
          className="w-full h-full rounded-full bg-white"
          style={{ opacity: isHovering ? 0.6 : 0.9 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
