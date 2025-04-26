"use client";

import { useCallback } from "react";
import { useCursor } from "./cursor-provider";
import { CursorVariantType } from "./custom-cursor";

export interface UseCursorHoverProps {
  variant?: CursorVariantType;
  text?: string;
  icon?: React.ReactNode;
  resetOnLeave?: boolean;
  resetVariant?: CursorVariantType;
}

export function useCursorHover({
  variant = "default",
  text = "",
  icon = null,
  resetOnLeave = true,
  resetVariant = "rotating"
}: UseCursorHoverProps = {}) {
  const { 
    setCursorVariant, 
    setCursorText, 
    setCursorIcon,
    cursorVariant,
    isTouch
  } = useCursor();

  const handleMouseEnter = useCallback(() => {
    // Don't apply cursor effects on touch devices
    if (isTouch) return;
    
    setCursorVariant(variant);
    if (text) setCursorText(text);
    if (icon) setCursorIcon(icon);
  }, [variant, text, icon, setCursorVariant, setCursorText, setCursorIcon, isTouch]);

  const handleMouseLeave = useCallback(() => {
    // Don't apply cursor effects on touch devices
    if (isTouch) return;
    
    if (resetOnLeave) {
      setCursorVariant(resetVariant);
      if (text) setCursorText("");
      if (icon) setCursorIcon(null);
    }
  }, [
    resetOnLeave, 
    resetVariant, 
    text, 
    icon, 
    setCursorVariant, 
    setCursorText, 
    setCursorIcon,
    isTouch
  ]);

  // If it's a touch device, return empty handlers to avoid unnecessary processing
  if (isTouch) {
    return {};
  }

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
} 