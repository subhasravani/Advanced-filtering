"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Alert = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative w-full rounded-lg border border-border bg-background p-4 text-sm [&_svg]:h-4 [&_svg]:w-4",
          className,
        )}
        role="alert"
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("text-sm opacity-70", className)} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
AlertDescription.displayName = "AlertDescription"

const AlertTitle = React.forwardRef<React.ElementRef<"p">, React.ComponentPropsWithoutRef<"p">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={cn("font-medium", className)} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
AlertTitle.displayName = "AlertTitle"

export { Alert, AlertTitle, AlertDescription }
import { AlertTriangle } from "lucide-react"
export { AlertTriangle }
