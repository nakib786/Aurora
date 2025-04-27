"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from '../animations/MotionComponents';
import { cn } from "@/lib/utils";

const customCursorSpringConfig = {
  damping: 25,
  stiffness: 250,
  mass: 1,
  restSpeed: 0.01,
  restDelta: 0.01,
  duration: 0.4,
};

// Function to detect touch-based devices
function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     ((navigator as any).msMaxTouchPoints > 0));
}

export const customCursorVariants = {
  default: {
    scale: 1,
  },
  sm: {
    scale: 0.4,
  },
  lg: {
    scale: 1.5,
  },
  hidden: {
    scale: 0,
    opacity: 0,
  },
  // Design-related cursors
  design: {
    scale: 1.2,
    rotate: [0, 10, 0],
    transition: { duration: 1.5, repeat: Infinity }
  },
  creative: {
    scale: 1.3,
    rotate: [0, 15, 0, -15, 0],
    transition: { duration: 2, repeat: Infinity }
  },
  // Accounting-related cursors
  accounting: {
    scale: 0.9,
  },
  finance: {
    scale: 0.8,
  },
  // Action-related cursors
  view: {
    scale: 1.1,
  },
  click: {
    scale: [0.8, 1, 0.8],
    transition: { duration: 1, repeat: Infinity }
  },
  scroll: {
    scale: 0.9,
    y: [0, 5, 0, -5, 0],
    transition: { duration: 1.5, repeat: Infinity }
  },
  drag: {
    scale: 1.1,
  },
  // Special rotating cursor
  rotating: {
    scale: [0.9, 1.1, 0.9],
    rotate: [0, 10, 0, -10, 0],
    transition: { duration: 3, repeat: Infinity }
  }
};

export type CursorVariantType = keyof typeof customCursorVariants;

export function useSetCursorVariant() {
  const [cursorVariant, setCursorVariant] =
    React.useState<CursorVariantType>("rotating");
  const [cursorText, setCursorText] = React.useState<string>("");
  const [cursorIcon, setCursorIcon] = React.useState<React.ReactNode>(null);

  return {
    cursorVariant,
    setCursorVariant,
    cursorText,
    setCursorText,
    cursorIcon,
    setCursorIcon
  };
}

interface CustomCursorProps {
  variant?: CursorVariantType;
  text?: string;
  className?: string;
  icon?: React.ReactNode;
  autoRotate?: boolean;
}

// User-specified emoji set for the cursor
const USER_EMOJI_SET = [
  '🖱️', // Mouse
  '🖖', // Vulcan Salute
  '🐭', // Mouse Face
  '🐱', // Cat Face
  '🐶', // Dog Face
  '🦊', // Fox Face
  '🐸', // Frog Face
  '🐢', // Turtle
  '🦄', // Unicorn
  '🐝', // Bee
];

// Map for specific cursor variants (when not rotating)
const CURSOR_EMOJIS: Record<CursorVariantType, string> = {
  default: '🖱️',
  sm: '🐭',
  lg: '🖱️',
  hidden: '',
  design: '🎨',
  creative: '✨',
  accounting: '📊',
  finance: '💰',
  view: '👁️',
  click: '👇',
  scroll: '⬇️',
  drag: '✋',
  rotating: '🖱️'
};

function getRandomEmoji(): string {
  const randomIndex = Math.floor(Math.random() * USER_EMOJI_SET.length);
  return USER_EMOJI_SET[randomIndex];
}

export function CustomCursor({
  variant = "rotating",
  text = "",
  className,
  icon = null,
  autoRotate = true, // This is now always true but kept for compatibility
}: CustomCursorProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [currentEmoji, setCurrentEmoji] = React.useState<string>('🖱️'); // Default emoji for SSR
  const [isTouch, setIsTouch] = React.useState(false);
  const isTextNotEmpty = text !== "";
  
  // Create motion values at the top level of the component
  // These need to be defined here, not inside an effect
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, customCursorSpringConfig);
  const cursorYSpring = useSpring(cursorY, customCursorSpringConfig);
  
  // Handle client-side initialization
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsMounted(true);
    
    // Check if this is a touch device
    const touchDevice = isTouchDevice();
    setIsTouch(touchDevice);
    
    // Only set up cursor tracking on non-touch devices
    if (!touchDevice) {
      document.body.style.cursor = "none";
      
      // Set initial emoji
      setCurrentEmoji(getRandomEmoji());
      
      // Handle mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      
      // Add event listener
      window.addEventListener("mousemove", handleMouseMove);
      
      // Clean up
      return () => {
        document.body.style.cursor = "auto";
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [cursorX, cursorY]);

  // Always rotate through emojis randomly every 3 seconds when in rotating mode
  React.useEffect(() => {
    if (!isMounted || variant !== "rotating" || isTouch) return;
    
    const intervalId = setInterval(() => {
      setCurrentEmoji(getRandomEmoji());
    }, 3000);

    return () => clearInterval(intervalId);
  }, [variant, isMounted, isTouch]);

  // When variant changes and is not rotating, use a specific emoji
  React.useEffect(() => {
    if (!isMounted || isTouch) return;
    
    if (variant !== "rotating" && CURSOR_EMOJIS[variant]) {
      setCurrentEmoji(CURSOR_EMOJIS[variant]);
    }
  }, [variant, isMounted, isTouch]);

  // Don't render if SSR or touch device
  if (!isMounted || isTouch) return null;
  
  // For non-rotating variants, use a specific emoji from USER_EMOJI_SET if possible
  const displayEmoji = variant === "rotating" 
    ? currentEmoji 
    : (USER_EMOJI_SET.includes(CURSOR_EMOJIS[variant]) 
        ? CURSOR_EMOJIS[variant] 
        : getRandomEmoji());

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] flex select-none items-center justify-center",
        isTextNotEmpty 
          ? "h-auto min-h-10 min-w-20 w-auto rounded-md p-2 bg-black text-white" 
          : "h-14 w-14 flex items-center justify-center",
        className
      )}
      variants={customCursorVariants}
      animate={variant}
      style={{
        y: cursorYSpring,
        x: cursorXSpring,
      }}
    >
      <AnimatePresence mode="wait">
        {isTextNotEmpty ? (
          <motion.span
            className="inline-block whitespace-nowrap"
            transition={{ duration: 0.3, ease: "easeIn" }}
            animate={isTextNotEmpty ? { y: "0%" } : { y: "100%" }}
            exit={{ y: "100%" }}
          >
            {text}
          </motion.span>
        ) : icon ? (
          <>{icon}</>
        ) : (
          <motion.span 
            key={currentEmoji}
            className="text-3xl"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            {displayEmoji}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 