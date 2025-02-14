import { Card, CardContent } from "@/components/ui/card"

export function AQIFeed() {
  const aqiData = [
    { location: "CBD", aqi: 65, status: "Moderate" },
    { location: "Westlands", aqi: 42, status: "Good" },
    { location: "Eastleigh", aqi: 89, status: "Unhealthy" },
    { location: "Karen", aqi: 35, status: "Good" },
  ]

  return (
    <div className="space-y-2">
      {aqiData.map((item, index) => (
        <Card key={index} className="border-none bg-[#333]">
          <CardContent className="flex items-center justify-between p-3">
            <span>{item.location}</span>
            <span className={`font-semibold ${getAQIColor(item.aqi)}`}>{item.aqi}</span>
            <span className="text-sm text-gray-400">{item.status}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getAQIColor(aqi: number) {
  if (aqi <= 50) return "text-green-400"
  if (aqi <= 100) return "text-yellow-400"
  if (aqi <= 150) return "text-orange-400"
  return "text-red-400"
}

