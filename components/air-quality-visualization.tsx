"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _aqiFeed?: (config: any) => void;
  }
}

export function AirQualityVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//feed.aqicn.org/feed/nairobi/en/feed.v1.js";
    script.async = true;
    document.body.appendChild(script);

    const loadFeed = () => {
      if (window._aqiFeed && containerRef.current) {
        window._aqiFeed({
          container: containerRef.current,
          city: "nairobi",
          lang: "en",
        });
      } else {
        console.error("AQI feed script did not load in time.");
      }
    };

    // Set a timeout to wait for the script to load
    const timeoutId = setTimeout(loadFeed, 5000); // Adjust the timeout duration as needed

    // Clean up the timeout and script on component unmount
    return () => {
      clearTimeout(timeoutId);
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={containerRef} id="city-aqi-container"></div>;
}
