"use client";

import { cn } from "@unstage/ui/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: number;
  className?: string;
  filledClassName?: string;
  emptyClassName?: string;
  label?: string;
};

export function Progress({
  value,
  className,
  filledClassName = "dark:bg-green-500 bg-green-600",
  emptyClassName = "bg-border",
  label,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  const percent = Math.max(0, Math.min(1, value));

  const recalc = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    const n = Math.floor(element.clientWidth / 8);
    setCount(Math.max(1, n));
  }, []);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [recalc]);

  const filled = useMemo(() => Math.round((count || 0) * percent), [count, percent]);

  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ id: `bar-${i}`, index: i })),
    [count]
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        ref={ref}
        className={cn("flex items-center h-6 gap-1 w-full", className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent * 100)}
        aria-label="Progress"
      >
        {items.map(({ id, index }) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.01 }}
            key={id}
            className={cn(
              index < filled ? filledClassName : emptyClassName,
              "h-6 w-1 rounded-full"
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{label || `${percent * 100}% complete`}</p>
    </div>
  );
}
