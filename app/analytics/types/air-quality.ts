// src/lib/air-quality.ts
export const fetchAirQualityData = async () => {
  const response = await fetch(
    "https://api.waqi.info/feed/@9470/?token=fc646f91f10772d2056e2765da59858ca9049688",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }
  return response.json();
};
