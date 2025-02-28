// src/analytics/types/air-quality-data.ts
export interface AirQualityData {
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
      no2?: { v: number }; // Optional NO2
      co?: { v: number }; // Optional CO
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
