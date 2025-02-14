"use client"

import { useEffect, useRef } from "react"
import { Bell } from "lucide-react"
import { Chart } from "chart.js/auto"

import { Button } from "@/components/ui/button"
import { LocationCard } from "@/components/ui/location-card"
import { MetricCard } from "@/components/ui/metric-card"
import { Sidebar } from "@/components/ui/sidebar"
import { AirQualityVisualization } from "@/components/air-quality-visualization"

export default function DashboardPage() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 27 }, (_, i) => i + 1),
        datasets: [
          {
            label: "PM 2.5",
            data: [
              20, 35, 45, 30, 55, 40, 45, 35, 55, 40, 50, 60, 45, 35, 25, 45, 55, 40, 35, 30, 45, 50, 55, 45, 40, 35,
              30,
            ],
            borderColor: "#7ac943",
            tension: 0.4,
          },
          {
            label: "NO2",
            data: [
              30, 40, 35, 45, 40, 35, 45, 50, 40, 35, 45, 50, 40, 45, 35, 40, 45, 35, 30, 40, 45, 35, 40, 45, 50, 45,
              40,
            ],
            borderColor: "#9333ea",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold">Emmanuel Ngunnzi</h1>
              <p className="text-sm text-gray-500">UID: 112A4B</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
          </Button>
        </header>
        <main className="p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard title="Current Pollution Level" value={65} label="Moderate" type="indoor" />
              <MetricCard title="Today's Average PM2.5 Levels" value={12} label="Indoor" type="outdoor" />
              <MetricCard title="Today's Average NO2 Levels" value={244} label="Indoor" type="outdoor" />
            </div>
            <div className="rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Nairobi Air Quality Index</h2>
              <AirQualityVisualization />
            </div>
            <div className="rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">PM 2.5 comparison with NO2</h2>
              <div className="h-[300px]">
                <canvas ref={chartRef} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <LocationCard location="BUS STATION" pm25={149} co2={79} />
              <LocationCard location="MOI AVENUE" pm25={149} co2={79} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

