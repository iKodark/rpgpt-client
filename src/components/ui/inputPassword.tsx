import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleToggleShowPassword = () => {

      setShowPassword(!showPassword);
    }

    const Icon = showPassword ? EyeOff : Eye;

    return (
      <div
        className={cn(
          "relative w-full",
          className
        )}
      >
        <input
          className={cn(
            "flex h-9 w-full rounded-none border border-input bg-transparent px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-11",
            className
          )}
          ref={ref}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute w-11 h-10 p-0 bg-transparent hover:bg-transparent right-0 top-0"
          onClick={handleToggleShowPassword}
        >
          <Icon size={20} strokeWidth={1.75} absoluteStrokeWidth />
        </Button>
      </div>
    )
  }
)
InputPassword.displayName = "Input"

export { InputPassword }
