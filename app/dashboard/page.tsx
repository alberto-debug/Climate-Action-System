"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { Chart } from "chart.js/auto";

import { Button } from "@/components/ui/button";
import { LocationCard } from "@/components/ui/location-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Sidebar } from "@/components/ui/sidebar";
import { AirQualityVisualization } from "@/components/air-quality-visualization";

// Define the TypeScript interface for the air quality data
interface AirQualityData {
  status: string;
  data: {
    aqi: number;
    idx: number;
    attributions: Array<{
      url: string;
      name: string;
      logo: string;
    }>;
    city: {
      geo: [number, number];
      name: string;
      url: string;
      location: string;
    };
    dominentpol: string;
    iaqi: {
      dew: { v: number };
      h: { v: number };
      p: { v: number };
      pm25: { v: number };
      t: { v: number };
      w: { v: number };
      no2?: { v: number }; // Make no2 optional
    };
    time: {
      s: string;
      tz: string;
      v: number;
      iso: string;
    };
    forecast: {
      daily: {
        o3: Array<{ avg: number; day: string; max: number; min: number }>;
        pm10: Array<{ avg: number; day: string; max: number; min: number }>;
        pm25: Array<{ avg: number; day: string; max: number; min: number }>;
        uvi: Array<{ avg: number; day: string; max: number; min: number }>;
      };
    };
    debug: {
      sync: string;
    };
  };
}

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
    const no2Data = airQualityData.data.forecast.daily.o3.map((day) => day.avg); // Assuming NO2 data is not available, using O3 as a placeholder
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
            label: "NO2",
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
                PM 2.5 comparison with NO2
              </h2>
              <div className="h-[300px]">
                <canvas ref={chartRef} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <LocationCard
                location="BUS STATION"
                pm25={airQualityData?.data.iaqi.pm25.v || 0}
                co2={79} // Assuming CO2 data is not available, using a placeholder value
              />
              <LocationCard
                location="MOI AVENUE"
                pm25={airQualityData?.data.iaqi.pm25.v || 0}
                co2={79} // Assuming CO2 data is not available, using a placeholder value
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
