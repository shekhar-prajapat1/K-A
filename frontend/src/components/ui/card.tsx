import * as React from "react"
import { cn } from "@/lib/utils"

// Card Container
const CardComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow-md", className)}
      {...props}
    />
  )
)
CardComponent.displayName = "CardComponent"

// Card Header Section
const CardHeaderSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 p-6", className)}
      {...props}
    />
  )
)
CardHeaderSection.displayName = "CardHeaderSection"

// Card Title for Emphasis
const CardTitleComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold text-lg leading-tight tracking-normal", className)}
      {...props}
    />
  )
)
CardTitleComponent.displayName = "CardTitleComponent"

// Card Description Text
const CardDescriptionComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescriptionComponent.displayName = "CardDescriptionComponent"

// Card Content Area
const CardBodyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardBodyContent.displayName = "CardBodyContent"

// Card Footer Section
const CardFooterSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooterSection.displayName = "CardFooterSection"

// Exporting components for reuse
export { 
  CardComponent as Card, 
  CardHeaderSection as CardHeader, 
  CardFooterSection as CardFooter, 
  CardTitleComponent as CardTitle, 
  CardDescriptionComponent as CardDescription, 
  CardBodyContent as CardContent 
}
