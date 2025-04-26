"use client";

import { useCursorHover } from "@/components/ui/use-cursor-hover";
import { 
  CursorDiv, 
  CursorButton,
  CursorLink,
  DesignCursor, 
  CreativeCursor,
  AccountingCursor,
  FinanceCursor,
  ViewCursor,
  ClickCursor,
  DragCursor,
  ScrollCursor
} from "@/components/ui/cursor-auto";
import { useCursor } from "@/components/ui/cursor-provider";

const EMOJI_DESCRIPTIONS = {
  default: '👆 - Default cursor',
  design: '🎨 - Design section cursor',
  creative: '✨ - Creative section cursor',
  accounting: '📊 - Accounting section cursor',
  finance: '💰 - Finance section cursor',
  view: '👁️ - View action cursor',
  click: '👇 - Click action cursor',
  scroll: '⬇️ - Scroll action cursor',
  drag: '✋ - Drag action cursor',
  sm: '🔍 - Small cursor for details',
  lg: '👋 - Large cursor for emphasis',
  rotating: '🔄 - Auto-rotating emoji cursor'
};

export function CursorShowcase() {
  // Examples with the hook approach
  const buttonHoverProps = useCursorHover({ variant: "click", text: "Click me" });
  const imageHoverProps = useCursorHover({ variant: "view", text: "View" });
  const textHoverProps = useCursorHover({ variant: "sm" });
  
  // Get rotation state from cursor context
  const { autoRotate, setAutoRotate } = useCursor();

  return (
    <div className="space-y-12 p-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Auto-Rotating Emoji Cursor</h2>
        <p className="text-muted-foreground">
          The cursor now automatically cycles through different emojis every 5 seconds.
          Hover over elements to see specific emojis, then move away to resume rotation.
        </p>
        
        <div className="flex items-center gap-4">
          <CursorButton
            cursorVariant="rotating" 
            className="rounded-md bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-white"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Pause" : "Resume"} auto-rotation
          </CursorButton>
          
          <span className="text-sm font-medium">
            Status: {autoRotate ? "Running" : "Paused"}
          </span>
        </div>
      </section>

      {/* Emoji Legend */}
      <section className="space-y-4 rounded-lg bg-slate-100 p-6 dark:bg-slate-900">
        <h3 className="text-xl font-bold">Emoji Cursor Legend</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {Object.entries(EMOJI_DESCRIPTIONS).map(([variant, description]) => (
            <div key={variant} className="flex items-center gap-2 rounded-md bg-white p-2 dark:bg-slate-800">
              <span className="text-xl">{description.split(' - ')[0]}</span>
              <span className="text-sm text-muted-foreground">{description.split(' - ')[1]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Design section */}
      <section className="space-y-4 rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
        <h3 className="text-xl font-bold">Web Design Section</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DesignCursor className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800">
            Hover for Design cursor (🎨)
          </DesignCursor>
          <CreativeCursor className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800">
            Hover for Creative cursor (✨)
          </CreativeCursor>
        </div>
      </section>

      {/* Accounting section */}
      <section className="space-y-4 rounded-lg bg-blue-50 p-6 dark:bg-blue-950">
        <h3 className="text-xl font-bold">Accounting Section</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AccountingCursor className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800">
            Hover for Accounting cursor (📊)
          </AccountingCursor>
          <FinanceCursor className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800">
            Hover for Finance cursor (💰)
          </FinanceCursor>
        </div>
      </section>

      {/* Action cursors */}
      <section className="space-y-4 rounded-lg bg-amber-50 p-6 dark:bg-amber-950">
        <h3 className="text-xl font-bold">Action Cursors</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ViewCursor 
            text="See details"
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Hover for View cursor (👁️)
          </ViewCursor>
          <ClickCursor 
            text="Add to cart"
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Hover for Click cursor (👇)
          </ClickCursor>
          <DragCursor 
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Hover for Drag cursor (✋)
          </DragCursor>
          <ScrollCursor 
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Hover for Scroll cursor (⬇️)
          </ScrollCursor>
        </div>
      </section>

      {/* Component Types */}
      <section className="space-y-4 rounded-lg bg-purple-50 p-6 dark:bg-purple-950">
        <h3 className="text-xl font-bold">Component Types</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CursorButton 
            cursorVariant="click"
            cursorText="Click button" 
            className="flex h-32 w-full items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Button component
          </CursorButton>
          <CursorLink 
            href="#"
            cursorText="Visit link"
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Link component
          </CursorLink>
          <CursorDiv 
            cursorVariant="creative"
            cursorText="Creative magic" 
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
          >
            Div with custom cursor
          </CursorDiv>
        </div>
      </section>

      {/* Text cursors */}
      <section className="space-y-4 rounded-lg bg-green-50 p-6 dark:bg-green-950">
        <h3 className="text-xl font-bold">Text + Emoji Combinations</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <button 
            className="flex h-32 w-full items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
            {...buttonHoverProps}
          >
            Button with tooltip text
          </button>
          <div 
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
            {...imageHoverProps}
          >
            Image preview effect
          </div>
          <p 
            className="flex h-32 items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm dark:bg-zinc-800"
            {...textHoverProps}
          >
            Text with magnifier cursor (🔍)
          </p>
        </div>
      </section>
    </div>
  );
} 