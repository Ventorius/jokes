import { forwardRef } from "react";
import type { ReactNode, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  isLoading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, isLoading, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-blue-600 bg-slate-900 ring-offset-background focus-within:ring-2",
          className,
        )}
      >
        <input
          type={type}
          className={cn(
            "flex-grow px-3 py-2 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pr-10",
          )}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <div className="flex items-center pr-3 pointer-events-none text-blue-600">
            <RefreshCcw className="animate-spin" />
          </div>
        )}
        {!isLoading && icon && (
          <div className="flex items-center pr-3 pointer-events-none text-blue-600">
            {icon}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
