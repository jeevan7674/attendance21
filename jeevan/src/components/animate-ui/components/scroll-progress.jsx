'use client';;
import * as React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

import { cn } from '@/lib/utils';

function ScrollProgress({
  ref,
  className,
  children,
  progressProps,
  ...props
}) {
  const containerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => containerRef.current);

  const { scrollYProgress } = useScroll(children ? { container: containerRef } : undefined);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    bounce: 0,
  });

  return (
    <>
      <motion.div
        data-slot="scroll-progress"
        {...progressProps}
        style={{ scaleX }}
        className={cn(
          'fixed z-50 top-0 inset-x-0 h-1 bg-blue-500 origin-left',
          progressProps?.className
        )} />
      {containerRef && (
        <div
          ref={containerRef}
          data-slot="scroll-progress-container"
          className={cn('overflow-y-auto h-full', className)}
          {...props}>
          {children}
        </div>
      )}
    </>
  );
}

export { ScrollProgress };
