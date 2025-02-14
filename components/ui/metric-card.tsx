import { Card } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: number
  label: string
  type: "indoor" | "outdoor"
  time?: string
}

export function MetricCard({ title, value, label, type, time = "UPTO 11:00AM" }: MetricCardProps) {
  const getBgColor = (value: number) => {
    if (value <= 50) return "bg-green-500"
    if (value <= 100) return "bg-yellow-500"
    return "bg-purple-500"
  }

  const getLabel = (value: number) => {
    if (value <= 50) return "Good"
    if (value <= 100) return "Moderate"
    return "Hazardous"
  }

  return (
    <Card className="bg-zinc-900 text-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-white/20" />
            <span className="text-sm text-gray-400">{title}</span>
          </div>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <div className={`${type === "indoor" ? "flex" : "grid grid-cols-2 gap-4"}`}>
          {type === "indoor" ? (
            <div className={`${getBgColor(value)} rounded-full px-4 py-2`}>
              <span className="text-2xl font-bold">{value}</span>
              <span className="ml-2 text-sm">{getLabel(value)}</span>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className={`${getBgColor(value)} rounded-full px-4 py-2 inline-block`}>
                  <span className="text-2xl font-bold">{value}</span>
                </div>
                <p className="mt-1 text-sm text-gray-400">{label}</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 rounded-full px-4 py-2 inline-block">
                  <span className="text-2xl font-bold">244</span>
                </div>
                <p className="mt-1 text-sm text-gray-400">Outdoor</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

