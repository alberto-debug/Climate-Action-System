import { Card } from "@/components/ui/card"

interface LocationCardProps {
  location: string
  pm25: number
  co2: number
}

export function LocationCard({ location, pm25, co2 }: LocationCardProps) {
  return (
    <Card className="bg-zinc-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 uppercase">{location}</h3>
          <div className="mt-4 grid grid-cols-2 gap-8">
            <div className="relative">
              <svg className="w-16 h-16" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="20" fill="none" stroke="#333" strokeWidth="4" />
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#ff4444"
                  strokeWidth="4"
                  strokeDasharray={`${(pm25 / 200) * 125.6} 125.6`}
                  transform="rotate(-90 22 22)"
                />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="text-lg font-bold" fill="white">
                  {pm25}
                </text>
              </svg>
              <div className="mt-2">
                <p className="text-gray-400">PM 2.5</p>
                <p className="text-red-500">Hazardous</p>
              </div>
            </div>
            <div className="relative">
              <svg className="w-16 h-16" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="20" fill="none" stroke="#333" strokeWidth="4" />
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#7ac943"
                  strokeWidth="4"
                  strokeDasharray={`${(co2 / 100) * 125.6} 125.6`}
                  transform="rotate(-90 22 22)"
                />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="text-lg font-bold" fill="white">
                  {co2}
                </text>
              </svg>
              <div className="mt-2">
                <p className="text-gray-400">CO₂</p>
                <p className="text-[#7ac943]">Normal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

