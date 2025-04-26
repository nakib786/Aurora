'use client';

import React from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { CursorProvider } from '@/components/ui/cursor-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <CursorProvider>{children}</CursorProvider>
    </ThemeProvider>
  );
} 