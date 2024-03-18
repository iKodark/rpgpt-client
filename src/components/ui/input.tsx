import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";

export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-none border border-input bg-transparent px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string,
  description?: string,
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, description, label, ...props }, ref) => {

    const { control } = useFormContext();

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {
              label && (
                <FormLabel>
                  {label}
                </FormLabel>
              )
            }
            <FormControl>
              <Field {...field} {...props} ref={ref} />
            </FormControl>
            {
              description && (
                <FormDescription>
                  {description}
                </FormDescription>
              )
            }
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
