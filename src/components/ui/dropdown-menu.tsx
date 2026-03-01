import * as React from "react"
import { cn } from "@/lib/utils"

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block text-left">{children}</div>
)

export const DropdownMenuTrigger = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
)

export const DropdownMenuContent = ({ children, className }: any) => (
  <div className={cn("absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", className)}>
    <div className="py-1">{children}</div>
  </div>
)

export const DropdownMenuItem = ({ children, onClick, className }: any) => (
  <button
    onClick={onClick}
    className={cn("block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100", className)}
  >
    {children}
  </button>
)
