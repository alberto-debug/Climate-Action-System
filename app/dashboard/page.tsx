"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { Chart } from "chart.js/auto";

import { Button } from "@/components/ui/button";
import { LocationCard } from "@/components/ui/location-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Sidebar } from "@/components/ui/sidebar";
import { AirQualityVisualization } from "@/components/air-quality-visualization";
import { AirQualityData } from "../analytics/types/air-quality-data"; // Adjust the import path as needed

const AQI_COLOR_SCALE = [
  { max: 50, color: "bg-green-500" }, // Good
  { max: 100, color: "bg-yellow-500" }, // Moderate
  { max: 150, color: "bg-orange-500" }, // Unhealthy for Sensitive Groups
  { max: 200, color: "bg-red-500" }, // Unhealthy
  { max: 300, color: "bg-purple-500" }, // Very Unhealthy
  { max: Number.MAX_VALUE, color: "bg-brown-500" }, // Hazardous
];

const getAQIColor = (aqi: number) => {
  for (let i = AQI_COLOR_SCALE.length - 1; i >= 0; i--) {
    if (aqi <= AQI_COLOR_SCALE[i].max) {
      return AQI_COLOR_SCALE[i].color;
    }
  }
  return "bg-gray-500"; // Default color if AQI is undefined
};

export default function DashboardPage() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.waqi.info/feed/@9470/?token=fc646f91f10772d2056e2765da59858ca9049688",
        );
        const data: AirQualityData = await response.json();
        setAirQualityData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !airQualityData) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const pm25Data = airQualityData.data.forecast.daily.pm25.map(
      (day) => day.avg,
    );
    const no2Data = airQualityData.data.forecast.daily.o3.map((day) => day.avg); // Using O3 as a placeholder for NO2
    const labels = airQualityData.data.forecast.daily.pm25.map(
      (day) => day.day,
    );

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "PM 2.5",
            data: pm25Data,
            borderColor: "#7ac943",
            tension: 0.4,
          },
          {
            label: "NO2 (O3 as proxy)",
            data: no2Data,
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
    });

    return () => {
      chart.destroy();
    };
  }, [airQualityData]);

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
              <MetricCard
                title="Current Pollution Level"
                value={airQualityData?.data.aqi || 0}
                label="Moderate"
                type="indoor"
              />
              <MetricCard
                title="Today's Average PM2.5 Levels"
                value={airQualityData?.data.iaqi.pm25.v || 0}
                label="Indoor"
                type="outdoor"
              />
              <MetricCard
                title="Today's Average NO2 Levels"
                value={airQualityData?.data.iaqi.no2?.v || 0}
                label="Indoor"
                type="outdoor"
              />
            </div>
            <div className="rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Nairobi Air Quality Index
              </h2>
              <AirQualityVisualization />
            </div>
            <div className="rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">
                PM 2.5 comparison with NO2 (O3 as proxy)
              </h2>
              <div className="h-[300px]">
                <canvas ref={chartRef} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <LocationCard
                location="BUS STATION"
                pm25={airQualityData?.data.iaqi.pm25.v || 0}
                co2={airQualityData?.data.iaqi.co?.v || 0} // Use CO data if available
              />
              <LocationCard
                location="MOI AVENUE"
                pm25={airQualityData?.data.iaqi.pm25.v || 0}
                co2={airQualityData?.data.iaqi.co?.v || 0} // Use CO data if available
              />
            </div>
            {airQualityData && (
              <div className="rounded-lg bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">
                  Air Quality Forecast
                </h2>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        PM2.5
                      </th>
                      <th scope="col" className="px-6 py-3">
                        PM10
                      </th>
                      <th scope="col" className="px-6 py-3">
                        O3
                      </th>
                      <th scope="col" className="px-6 py-3">
                        UVI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {airQualityData.data.forecast.daily.pm25.map(
                      (pm25, index) => (
                        <tr key={index} className="bg-white border-b">
                          <td className="px-6 py-4">{pm25.day}</td>
                          <td className={`px-6 py-4 ${getAQIColor(pm25.avg)}`}>
                            {pm25.avg}
                          </td>
                          <td
                            className={`px-6 py-4 ${getAQIColor(airQualityData.data.forecast.daily.pm10[index].avg)}`}
                          >
                            {airQualityData.data.forecast.daily.pm10[index].avg}
                          </td>
                          <td
                            className={`px-6 py-4 ${getAQIColor(airQualityData.data.forecast.daily.o3[index].avg)}`}
                          >
                            {airQualityData.data.forecast.daily.o3[index].avg}
                          </td>
                          <td
                            className={`px-6 py-4 ${getAQIColor(airQualityData.data.forecast.daily.uvi[index].avg)}`}
                          >
                            {airQualityData.data.forecast.daily.uvi[index].avg}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
