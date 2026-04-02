"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ParticipantCard } from "./participant-card"
import { FilterPanel } from "./filter-panel"
import { Play, RefreshCw, SlidersHorizontal, Zap } from "lucide-react"

// Deterministic participant data to avoid hydration mismatch
const mockParticipants = [
  { id: 1, name: "Alexander Petrov", dateOfBirth: "1985-03-15", accountCreated: "2018-07-22" },
  { id: 2, name: "Maria Ivanova", dateOfBirth: "1992-08-24", accountCreated: "2019-01-10" },
  { id: 3, name: "Dmitri Volkov", dateOfBirth: "1978-11-02", accountCreated: "2016-04-18" },
  { id: 4, name: "Elena Sokolova", dateOfBirth: "1995-06-30", accountCreated: "2020-09-05" },
  { id: 5, name: "Nikolai Fedorov", dateOfBirth: "1988-01-17", accountCreated: "2017-12-03" },
  { id: 6, name: "Anastasia Kozlova", dateOfBirth: "1990-12-08", accountCreated: "2019-05-28" },
  { id: 7, name: "Viktor Morozov", dateOfBirth: "1982-04-25", accountCreated: "2015-11-14" },
  { id: 8, name: "Yulia Novikova", dateOfBirth: "1997-09-11", accountCreated: "2021-02-19" },
  { id: 9, name: "Sergei Smirnov", dateOfBirth: "1975-07-06", accountCreated: "2016-08-30" },
  { id: 10, name: "Olga Kuznetsova", dateOfBirth: "1993-02-14", accountCreated: "2018-03-07" },
  { id: 11, name: "Andrei Popov", dateOfBirth: "1986-10-29", accountCreated: "2017-06-15" },
  { id: 12, name: "Natalia Vasiliev", dateOfBirth: "1991-05-18", accountCreated: "2020-01-22" },
  { id: 13, name: "Ivan Mikhailov", dateOfBirth: "1980-08-03", accountCreated: "2015-09-11" },
  { id: 14, name: "Tatiana Pavlov", dateOfBirth: "1994-03-27", accountCreated: "2019-11-04" },
  { id: 15, name: "Pavel Romanov", dateOfBirth: "1987-12-12", accountCreated: "2018-04-26" },
  { id: 16, name: "Ekaterina Lebedev", dateOfBirth: "1996-07-21", accountCreated: "2021-06-08" },
  { id: 17, name: "Maxim Egorov", dateOfBirth: "1983-01-09", accountCreated: "2016-02-17" },
  { id: 18, name: "Svetlana Orlov", dateOfBirth: "1989-06-04", accountCreated: "2017-10-31" },
  { id: 19, name: "Alexei Makarov", dateOfBirth: "1976-11-16", accountCreated: "2015-05-23" },
  { id: 20, name: "Irina Zaitsev", dateOfBirth: "1998-04-08", accountCreated: "2022-03-14" },
  { id: 21, name: "Boris Petrov", dateOfBirth: "1981-09-22", accountCreated: "2016-12-09" },
  { id: 22, name: "Vera Ivanova", dateOfBirth: "1992-02-01", accountCreated: "2019-08-16" },
  { id: 23, name: "Roman Volkov", dateOfBirth: "1984-05-13", accountCreated: "2017-03-25" },
  { id: 24, name: "Larisa Sokolova", dateOfBirth: "1990-10-26", accountCreated: "2018-11-02" },
  { id: 25, name: "Mikhail Fedorov", dateOfBirth: "1977-03-07", accountCreated: "2015-07-19" },
  { id: 26, name: "Anna Kozlova", dateOfBirth: "1995-08-19", accountCreated: "2020-05-11" },
  { id: 27, name: "Vladimir Morozov", dateOfBirth: "1988-01-31", accountCreated: "2018-09-28" },
  { id: 28, name: "Galina Novikova", dateOfBirth: "1993-06-15", accountCreated: "2019-12-06" },
  { id: 29, name: "Konstantin Smirnov", dateOfBirth: "1979-11-28", accountCreated: "2016-06-21" },
  { id: 30, name: "Oksana Kuznetsova", dateOfBirth: "1997-04-04", accountCreated: "2021-08-13" },
  { id: 31, name: "Alexander Popov", dateOfBirth: "1985-09-10", accountCreated: "2017-01-30" },
  { id: 32, name: "Maria Vasiliev", dateOfBirth: "1991-12-23", accountCreated: "2019-04-07" },
  { id: 33, name: "Dmitri Mikhailov", dateOfBirth: "1982-07-16", accountCreated: "2016-10-24" },
  { id: 34, name: "Elena Pavlov", dateOfBirth: "1994-02-09", accountCreated: "2020-07-18" },
  { id: 35, name: "Nikolai Romanov", dateOfBirth: "1986-05-02", accountCreated: "2017-09-05" },
  { id: 36, name: "Anastasia Lebedev", dateOfBirth: "1996-10-15", accountCreated: "2021-11-27" },
  { id: 37, name: "Viktor Egorov", dateOfBirth: "1980-03-28", accountCreated: "2015-12-14" },
  { id: 38, name: "Yulia Orlov", dateOfBirth: "1998-08-11", accountCreated: "2022-06-01" },
  { id: 39, name: "Sergei Makarov", dateOfBirth: "1983-01-24", accountCreated: "2016-03-19" },
  { id: 40, name: "Olga Zaitsev", dateOfBirth: "1989-06-07", accountCreated: "2018-08-06" },
  { id: 41, name: "Andrei Petrov", dateOfBirth: "1976-11-20", accountCreated: "2015-04-12" },
  { id: 42, name: "Natalia Ivanova", dateOfBirth: "1992-04-03", accountCreated: "2019-10-29" },
  { id: 43, name: "Ivan Volkov", dateOfBirth: "1987-09-16", accountCreated: "2018-02-15" },
  { id: 44, name: "Tatiana Sokolova", dateOfBirth: "1995-02-28", accountCreated: "2020-12-23" },
  { id: 45, name: "Pavel Fedorov", dateOfBirth: "1981-07-11", accountCreated: "2016-07-08" },
  { id: 46, name: "Ekaterina Kozlova", dateOfBirth: "1993-12-04", accountCreated: "2019-03-16" },
  { id: 47, name: "Maxim Morozov", dateOfBirth: "1978-05-17", accountCreated: "2015-10-02" },
  { id: 48, name: "Svetlana Novikova", dateOfBirth: "1990-10-30", accountCreated: "2018-06-24" },
  { id: 49, name: "Alexei Smirnov", dateOfBirth: "1984-03-13", accountCreated: "2017-05-11" },
  { id: 50, name: "Irina Kuznetsova", dateOfBirth: "1997-08-26", accountCreated: "2021-09-08" },
]

export function TelegramApp() {
  const [isParsing, setIsParsing] = useState(false)
  const [showList, setShowList] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [buttonScale, setButtonScale] = useState(1)

  const handleStartParsing = useCallback(() => {
    setButtonScale(1.15)
    setTimeout(() => {
      setIsParsing(true)
      setTimeout(() => {
        setShowList(true)
      }, 500)
    }, 250)
  }, [])

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setShowList(false)
    setTimeout(() => {
      setShowList(true)
      setIsRefreshing(false)
    }, 1000)
  }, [])

  // Sort participants
  const sortedParticipants = [...mockParticipants].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "dob") return a.dateOfBirth.localeCompare(b.dateOfBirth)
    if (sortBy === "created") return b.accountCreated.localeCompare(a.accountCreated)
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="font-bold text-xl text-foreground">
                Telegram Parser
              </h1>
            </div>
            {showList && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={cn(
                    "w-11 h-11 rounded-xl bg-secondary flex items-center justify-center",
                    "border border-border",
                    "transition-all duration-200",
                    "hover:bg-secondary/80 hover:scale-105 hover:border-primary/50",
                    "hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                    "active:scale-95",
                    "disabled:opacity-50"
                  )}
                >
                  <RefreshCw
                    className={cn(
                      "w-5 h-5 text-foreground",
                      isRefreshing && "animate-spin"
                    )}
                  />
                </button>
                <button
                  onClick={() => setFilterPanelOpen(true)}
                  className={cn(
                    "w-11 h-11 rounded-xl bg-secondary flex items-center justify-center",
                    "border border-border",
                    "transition-all duration-200",
                    "hover:bg-secondary/80 hover:scale-105 hover:border-primary/50",
                    "hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                    "active:scale-95"
                  )}
                >
                  <SlidersHorizontal className="w-5 h-5 text-foreground" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Start Parsing Button */}
        <div
          className={cn(
            "flex flex-col items-center justify-center py-24",
            "transition-all duration-600 ease-out",
            isParsing
              ? "opacity-0 scale-75 absolute pointer-events-none"
              : "opacity-100 scale-100"
          )}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Ready to Parse
            </h2>
            <p className="text-muted-foreground text-lg">
              Click the button to fetch participants
            </p>
          </div>

          <button
            onClick={handleStartParsing}
            onMouseDown={() => setButtonScale(0.92)}
            onMouseUp={() => setButtonScale(1)}
            onMouseLeave={() => setButtonScale(1)}
            style={{ transform: `scale(${buttonScale})` }}
            className={cn(
              "w-36 h-36 rounded-full",
              "bg-gradient-to-br from-primary via-accent to-primary",
              "shadow-[0_0_60px_rgba(168,85,247,0.5),0_0_100px_rgba(168,85,247,0.3),inset_0_2px_20px_rgba(255,255,255,0.1)]",
              "flex items-center justify-center",
              "transition-all duration-300 ease-out",
              "hover:shadow-[0_0_80px_rgba(168,85,247,0.6),0_0_120px_rgba(168,85,247,0.4),inset_0_2px_20px_rgba(255,255,255,0.15)]",
              "active:shadow-[0_0_40px_rgba(168,85,247,0.4)]",
              "border border-primary/30"
            )}
          >
            <Play className="w-14 h-14 text-primary-foreground ml-1 drop-shadow-lg" />
          </button>

          <p className="text-sm text-muted-foreground mt-8 uppercase tracking-widest">
            Start Parsing
          </p>
        </div>

        {/* Participant List */}
        <div
          className={cn(
            "transition-all duration-600 ease-out",
            isParsing
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16 pointer-events-none absolute"
          )}
        >
          {/* Stats Bar */}
          <div className="flex items-center justify-between mb-6 p-5 bg-card rounded-2xl border border-border shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Total Participants</p>
              <p className="text-3xl font-bold text-foreground">
                {sortedParticipants.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {sortedParticipants.map((participant, index) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                index={index}
                isVisible={showList}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  )
}
