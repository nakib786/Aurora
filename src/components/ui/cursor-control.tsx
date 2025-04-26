"use client";

import React, { useState } from "react";
import { useCursor } from "./cursor-provider";

// User-specified emoji set for the control display
const EMOJIS = [
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

export function CursorControl() {
  const { autoRotate, setAutoRotate } = useCursor();
  const [showEmojis, setShowEmojis] = useState(false);
  
  // Show random emoji for preview
  const [previewEmoji, setPreviewEmoji] = useState(EMOJIS[0]);
  
  React.useEffect(() => {
    if (!autoRotate) return;
    
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * EMOJIS.length);
      setPreviewEmoji(EMOJIS[randomIndex]);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [autoRotate]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {showEmojis && (
        <div className="mb-2 max-w-xs rounded-lg bg-black/20 p-3 backdrop-blur-sm dark:bg-white/10">
          <div className="mb-2 text-xs font-medium">Rotating cursor emojis:</div>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((emoji, index) => (
              <div 
                key={index}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/20 text-lg"
              >
                {emoji}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs">Random change every 3 seconds</div>
        </div>
      )}
      
      <div className="flex items-center gap-2 rounded-full bg-black/20 p-2 backdrop-blur-sm dark:bg-white/10">
        <button
          onClick={() => setShowEmojis(!showEmojis)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-lg backdrop-blur-sm hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
          title="Show/hide available emojis"
        >
          {previewEmoji}
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-sm backdrop-blur-sm hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
          title={autoRotate ? "Pause emoji rotation" : "Start emoji rotation"}
        >
          {autoRotate ? "⏸️" : "▶️"}
        </button>
        <span className="mr-1 text-xs">
          {autoRotate ? "Auto-rotating" : "Paused"}
        </span>
      </div>
    </div>
  );
}

export function getRandomEmoji(): string {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
} 