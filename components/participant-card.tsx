"use client"

import { cn } from "@/lib/utils"
import { User, Calendar, Clock } from "lucide-react"

interface Participant {
  id: number
  name: string
  dateOfBirth: string
  accountCreated: string
}

interface ParticipantCardProps {
  participant: Participant
  index: number
  isVisible: boolean
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function ParticipantCard({ participant, index, isVisible }: ParticipantCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-card rounded-xl",
        "border border-border",
        "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        "transition-all duration-500 ease-out cursor-pointer",
        "hover:border-primary/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2),0_8px_30px_rgba(0,0,0,0.4)]",
        "hover:scale-[1.02] hover:-translate-y-1",
        "active:scale-[0.98]",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      )}
      style={{
        transitionDelay: isVisible ? `${Math.min(index * 50, 500)}ms` : "0ms",
      }}
    >
      {/* Empty Avatar Placeholder */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center border border-border">
          <User className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate mb-1">
          {participant.name}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Born: {formatDate(participant.dateOfBirth)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Joined: {formatDate(participant.accountCreated)}
          </span>
        </div>
      </div>

      {/* Glow indicator */}
      <div className="shrink-0">
        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
      </div>
    </div>
  )
}
