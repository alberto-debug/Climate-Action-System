"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AQIFeed } from "@/components/analytics/aqi-feed";
import { Sidebar } from "@/components/ui/sidebar";
import { fetchAirQualityData } from "./types/air-quality";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function AnalyticsPage() {
  const [airQualityData, setAirQualityData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAirQualityData();
        setAirQualityData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const user = {
    name: "Emmanuel Ngunnzi",
    uid: "1124AB",
    avatar: "/placeholder.svg?height=64&width=64",
  };

  const chartData = {
    labels:
      airQualityData?.data.forecast.daily.pm25.map((day: any) => day.day) || [],
    datasets: [
      {
        label: "PM 2.5",
        data:
          airQualityData?.data.forecast.daily.pm25.map((day: any) => day.avg) ||
          [],
        borderColor: "#666",
        tension: 0.4,
        fill: false,
      },
      {
        label: "NO2 (O3 as proxy)",
        data:
          airQualityData?.data.forecast.daily.o3.map((day: any) => day.avg) ||
          [],
        borderColor: "#9333ea",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#ddd",
        },
      },
      x: {
        grid: {
          color: "#ddd",
        },
      },
    },
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        {/* User Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">UID: {user.uid}</p>
          </div>
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="h-16 w-16 rounded-full"
          />
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Current Pollution Level</span>
                <span className="text-yellow-500">
                  {airQualityData?.data.aqi || 0}
                </span>
              </div>
              <div className="text-sm text-gray-500">Moderate</div>
            </CardContent>
          </Card>
          <Card className="border-none bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Today&apos;s Reading</span>
                <span className="text-orange-500">
                  {airQualityData?.data.iaqi.pm25.v || 0}
                </span>
              </div>
              <div className="text-sm text-gray-500">Indoor</div>
            </CardContent>
          </Card>
          <Card className="border-none bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Today&apos;s Average</span>
                <span className="text-purple-500">
                  {airQualityData?.data.iaqi.no2?.v || 0}
                </span>
              </div>
              <div className="text-sm text-gray-500">Outdoor</div>
            </CardContent>
          </Card>
        </div>

        {/* AQI Feed */}
        <Card className="mb-6 border-none bg-white shadow-md">
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg">Nairobi Air Quality Index</h3>
            <AQIFeed />
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mb-6 border-none bg-white shadow-md">
          <CardContent className="p-4">
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* Location Stats */}
        <div className="space-y-4">
          <Card className="border-none bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">BUS STATION</h3>
                  <p className="text-sm text-gray-500">PM 2.5 Hazardous</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {airQualityData?.data.iaqi.pm25.v || 0}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-green-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {airQualityData?.data.iaqi.no2?.v || 0}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Normal</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">MOI AVENUE</h3>
                  <p className="text-sm text-gray-500">PM 2.5 Hazardous</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {airQualityData?.data.iaqi.pm25.v || 0}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-16 w-16">
                    <div
                      className="absolute inset-0 rounded-full border-4 border-green-500"
                      style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {airQualityData?.data.iaqi.no2?.v || 0}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Normal</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
