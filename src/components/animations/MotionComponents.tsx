'use client';

import { 
  motion as motionOriginal,
  AnimatePresence as AnimatePresenceOriginal,
  Variants as VariantsOriginal,
  useScroll as useScrollOriginal,
  useTransform as useTransformOriginal,
  useInView as useInViewOriginal,
  useSpring as useSpringOriginal,
  useMotionValue as useMotionValueOriginal
} from 'framer-motion';

// Re-export specific components to avoid "export *" issues
export const motion = motionOriginal;
export const AnimatePresence = AnimatePresenceOriginal;
export const useScroll = useScrollOriginal;
export const useTransform = useTransformOriginal;
export const useInView = useInViewOriginal;
export const useSpring = useSpringOriginal;
export const useMotionValue = useMotionValueOriginal;
export type Variants = VariantsOriginal; 