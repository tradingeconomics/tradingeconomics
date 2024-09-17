import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-switch relative",
      className
    )}
    {...props}
    ref={ref}
  >
    <span className="dark:scale-100 scale-0 transition-transform absolute top-1/2 left-1 text-switch-foreground -translate-y-1/2">
      <Sun className="w-4 h-4"></Sun>
    </span>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-7 w-7 relative rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
      )}
    >
      <span className="dark:scale-0 scale-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform text-primary">
        <Sun className="w-4 h-4"></Sun>
      </span>
      <span className="dark:scale-100 scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform text-primary/60">
        <Moon className="w-4 h-4"></Moon>
      </span>
    </SwitchPrimitives.Thumb>
    <span className="dark:scale-0 scale-100 absolute top-1/2 right-1 text-switch-foreground -translate-y-1/2 transition-transform">
      <Moon className="w-4 h-4"></Moon>
    </span>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
