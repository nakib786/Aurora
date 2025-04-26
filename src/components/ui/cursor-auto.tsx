"use client";

import React from "react";
import { useCursorHover } from "./use-cursor-hover";
import { CursorVariantType } from "./custom-cursor";

// Helper to determine the appropriate cursor variant based on element type
function getVariantForElement(element: string, defaultVariant: CursorVariantType): CursorVariantType {
  switch (element) {
    case 'button':
    case 'a':
      return 'click';
    case 'img':
    case 'video':
      return 'view';
    case 'input':
    case 'textarea':
      return 'default';
    default:
      return defaultVariant;
  }
}

// Simplified cursor components for specific HTML elements
export function CursorButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { cursorVariant?: CursorVariantType; cursorText?: string }) {
  const { cursorVariant, cursorText, ...buttonProps } = props;
  const hoverProps = useCursorHover({
    variant: cursorVariant || 'click',
    text: cursorText
  });

  return <button {...buttonProps} {...hoverProps} />;
}

export function CursorLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { cursorVariant?: CursorVariantType; cursorText?: string }) {
  const { cursorVariant, cursorText, ...linkProps } = props;
  const hoverProps = useCursorHover({
    variant: cursorVariant || 'click',
    text: cursorText || 'Visit'
  });

  return <a {...linkProps} {...hoverProps} />;
}

export function CursorDiv(props: React.HTMLAttributes<HTMLDivElement> & { cursorVariant?: CursorVariantType; cursorText?: string }) {
  const { cursorVariant, cursorText, ...divProps } = props;
  const hoverProps = useCursorHover({
    variant: cursorVariant || 'default',
    text: cursorText
  });

  return <div {...divProps} {...hoverProps} />;
}

// Specialized components for different contexts
export function DesignCursor({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'design' });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

export function CreativeCursor({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'creative' });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

export function AccountingCursor({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'accounting' });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

export function FinanceCursor({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'finance' });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

export function ViewCursor({ children, text = "View", ...props }: React.PropsWithChildren<{ text?: string } & React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'view', text });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

export function ClickCursor({ children, text, ...props }: React.PropsWithChildren<{ text?: string } & React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'click', text });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

// A draggable item cursor
export function DragCursor({ children, text = "Drag", ...props }: React.PropsWithChildren<{ text?: string } & React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'drag', text });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

// A scrollable container cursor
export function ScrollCursor({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const hoverProps = useCursorHover({ variant: 'scroll' });
  return (
    <div {...props} {...hoverProps}>
      {children}
    </div>
  );
}

// For backward compatibility and documentation, we'll keep the CursorAuto name but implement it as a div
export const CursorAuto = CursorDiv; 