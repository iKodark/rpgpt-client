import * as React from "react";

import { Button } from "./button";

import { Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";

export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string,
  max?: number,
  min?: number,
  disabledAdd?: boolean,
  disabledRemove?: boolean
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, name, max, min, disabledAdd = false, disabledRemove = false, ...props }, ref) => {
    const { setValue } = useFormContext();
    const currentValue = useWatch({ name: name });

    const handlePlus = () => {

      if (max !== undefined && currentValue >= max)
        return;

      setValue(name, currentValue + 1);
    }

    const handleMinus = () => {

      if (min !== undefined && currentValue <= min)
        return;

      setValue(name, currentValue - 1);
    }

    return (
      <div
        className={cn(
          "relative w-full",
          className
        )}
      >
        <Button
          type="button"
          variant="ghost"
          className="absolute w-11 h-full p-0 left-0 top-0 z-50"
          disabled={
            (min !== undefined && currentValue <= min) || disabledRemove
          }
          onClick={handleMinus}
        >
          <Minus size={20} strokeWidth={1.75} absoluteStrokeWidth />
        </Button>
        <input
          className="flex h-9 w-full rounded-none border border-input bg-transparent py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-default disabled:opacity-100 px-11 text-center"
          disabled
          ref={ref}
          {...props}
          type="number"
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute w-11 h-full p-0 right-0 top-0 z-50"
          disabled={
            (max !== undefined && currentValue >= max) || disabledAdd
          }
          onClick={handlePlus}
        >
          <Plus size={20} strokeWidth={1.75} absoluteStrokeWidth />
        </Button>
      </div>
    )
  }
)

interface InputNumberProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string,
  description?: string,
  label?: string
}

export interface MixInputNumberProps extends Omit<InputNumberProps, "max" | "min">, FieldProps { }


const InputNumber = React.forwardRef<HTMLInputElement, MixInputNumberProps>(
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

InputNumber.displayName = "InputNumber"

export { InputNumber }
