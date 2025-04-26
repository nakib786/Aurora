"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CustomCursor } from "./custom-cursor";
import { CursorVariantType } from "./custom-cursor";

// Function to detect touch-based devices
function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     ((navigator as any).msMaxTouchPoints > 0));
}

// Create a context for the cursor state
type CursorContextType = {
  setCursorVariant: (variant: CursorVariantType) => void;
  setCursorText: (text: string) => void;
  setCursorIcon: (icon: React.ReactNode) => void;
  cursorVariant: CursorVariantType;
  cursorText: string;
  isTouch: boolean;
};

const CursorContext = createContext<CursorContextType>({
  setCursorVariant: () => {},
  setCursorText: () => {},
  setCursorIcon: () => {},
  cursorVariant: "rotating",
  cursorText: "",
  isTouch: false
});

export const useCursor = () => useContext(CursorContext);

interface CursorProviderProps {
  children: React.ReactNode;
}

// URL patterns to match for cursor changes
const URL_CURSOR_MAPPINGS = [
  { pattern: /\/webdesign/, variant: "design" },
  { pattern: /\/creative/, variant: "creative" },
  { pattern: /\/accounting/, variant: "accounting" },
  { pattern: /\/finance/, variant: "finance" },
  { pattern: /\/contact/, variant: "click" },
];

export function CursorProvider({ children }: CursorProviderProps) {
  // Initialize with server-safe defaults
  const [cursorVariant, setCursorVariant] = useState<CursorVariantType>("rotating");
  const [cursorText, setCursorText] = useState("");
  const [cursorIcon, setCursorIcon] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // This effect runs client-side only after mounting
  useEffect(() => {
    // Avoid any state changes during SSR
    if (typeof window === 'undefined') return;
    
    setIsMounted(true);
    
    // Check for touch devices
    const touchDevice = isTouchDevice();
    setIsTouch(touchDevice);
    
    if (touchDevice) {
      // No need to set up custom cursor for touch devices
      return;
    }
    
    // Auto-detect section based on URL path
    const handlePathChange = () => {
      const currentPath = window.location.pathname;

      // Check if we need to change cursor based on URL
      for (const mapping of URL_CURSOR_MAPPINGS) {
        if (mapping.pattern.test(currentPath)) {
          setCursorVariant(mapping.variant as CursorVariantType);
          return;
        }
      }
      
      // Default cursor if no match
      setCursorVariant("rotating");
    };

    // Set initial cursor
    handlePathChange();

    // Listen for navigation events
    window.addEventListener("popstate", handlePathChange);
    
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return (
    <CursorContext.Provider
      value={{
        setCursorVariant,
        setCursorText,
        setCursorIcon,
        cursorVariant,
        cursorText,
        isTouch
      }}
    >
      {children}
      {/* Only render the custom cursor after client-side hydration and on non-touch devices */}
      {isMounted && !isTouch && (
        <CustomCursor 
          variant={cursorVariant} 
          text={cursorText} 
          icon={cursorIcon}
          autoRotate={true}
        />
      )}
    </CursorContext.Provider>
  );
} 