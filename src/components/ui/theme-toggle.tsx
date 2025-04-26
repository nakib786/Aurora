"use client";

import * as React from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Computer } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeDropdown();
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", closeDropdown);
    }
    return () => document.removeEventListener("click", closeDropdown);
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          aria-label="Loading theme toggle"
        >
          <div className="h-5 w-5"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun className="h-5 w-5" />}
        {theme === "dark" && <Moon className="h-5 w-5" />}
        {theme === "system" && <Computer className="h-5 w-5" />}
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-36 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700"
          onKeyDown={handleKeyDown}
        >
          <button
            onClick={() => {
              setTheme("light");
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Sun className="h-4 w-4 mr-2" />
            Light
          </button>
          
          <button
            onClick={() => {
              setTheme("dark");
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </button>
          
          <button
            onClick={() => {
              setTheme("system");
              closeDropdown();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Computer className="h-4 w-4 mr-2" />
            System
          </button>
        </div>
      )}
    </div>
  );
} 