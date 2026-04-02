"use client"

import { cn } from "@/lib/utils"
import { X, ArrowUpDown, User, Calendar, Clock } from "lucide-react"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  sortBy: string
  setSortBy: (sort: string) => void
}

const sorts = [
  { id: "name", label: "Name", icon: User },
  { id: "dob", label: "Date of Birth", icon: Calendar },
  { id: "created", label: "Account Created", icon: Clock },
]

export function FilterPanel({
  isOpen,
  onClose,
  sortBy,
  setSortBy,
}: FilterPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-md z-40",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card z-50",
          "border-l border-border",
          "shadow-[-20px_0_60px_rgba(0,0,0,0.5)]",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              Sort Options
            </h2>
            <button
              onClick={onClose}
              className={cn(
                "w-10 h-10 rounded-xl bg-secondary flex items-center justify-center",
                "border border-border",
                "transition-all duration-200",
                "hover:bg-secondary/80 hover:scale-105 hover:border-primary/50",
                "hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                "active:scale-95"
              )}
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-8 overflow-auto">
            {/* Sort Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-widest flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Sort By
              </h3>
              <div className="space-y-2">
                {sorts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortBy(s.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-4 rounded-xl",
                      "border transition-all duration-200",
                      sortBy === s.id
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        : "bg-secondary border-border hover:border-primary/30 hover:bg-secondary/80"
                    )}
                  >
                    <s.icon className={cn(
                      "w-5 h-5",
                      sortBy === s.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "font-medium",
                      sortBy === s.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="p-6 border-t border-border">
            <button
              onClick={onClose}
              className={cn(
                "w-full py-4 rounded-xl font-semibold",
                "bg-gradient-to-r from-primary to-accent text-primary-foreground",
                "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
                "border border-primary/30",
                "transition-all duration-200",
                "hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-[1.02]",
                "active:scale-[0.98]"
              )}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
