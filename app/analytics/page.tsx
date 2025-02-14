"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { AQIFeed } from "@/components/analytics/aqi-feed"
import { Sidebar } from "@/components/ui/sidebar"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const user = {
    name: "Emmanuel Ngunnzi",
    uid: "1124AB",
    avatar: "/placeholder.svg?height=64&width=64",
  }

  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "PM 2.5 comparison with NO2",
        data: [
          40, 45, 42, 47, 45, 43, 44, 46, 48, 45, 42, 40, 43, 45, 47, 48, 45, 43, 42, 44, 46, 45, 43, 41, 44, 46, 48,
          45, 43, 42, 44,
        ],
        borderColor: "#666",
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#444",
        },
      },
      x: {
        grid: {
          color: "#444",
        },
      },
    },
  }

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        {/* User Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">UID: {user.uid}</p>
          </div>
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-16 w-16 rounded-full" />
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none bg-[#222]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Current Pollution Level</span>
                <span className="text-yellow-400">65</span>
              </div>
              <div className="text-sm text-gray-400">Moderate</div>
            </CardContent>
          </Card>
          <Card className="border-none bg-[#222]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Today&apos;s Reading</span>
                <span className="text-orange-400">12</span>
              </div>
              <div className="text-sm text-gray-400">Indoor</div>
            </CardContent>
          </Card>
          <Card className="border-none bg-[#222]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Today&apos;s Average</span>
                <span className="text-purple-400">244</span>
              </div>
              <div className="text-sm text-gray-400">Outdoor</div>
            </CardContent>
          </Card>
        </div>

        {/* AQI Feed */}
        <Card className="mb-6 border-none bg-[#222]">
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg">Nairobi Air Quality Index</h3>
            <AQIFeed />
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mb-6 border-none bg-[#222]">
          <CardContent className="p-4">
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Location Stats */}
        <div className="space-y-4">
          <Card className="border-none bg-[#222]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">BUS STATION</h3>
                  <p className="text-sm text-gray-400">PM 2.5 Hazardous</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">149</span>
                    </div>
                  </div>
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-green-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">79</span>
                    </div>
                    <span className="text-sm text-gray-400">Normal</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-[#222]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">MOI AVENUE</h3>
                  <p className="text-sm text-gray-400">PM 2.5 Hazardous</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">149</span>
                    </div>
                  </div>
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-green-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">79</span>
                    </div>
                    <span className="text-sm text-gray-400">Normal</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

