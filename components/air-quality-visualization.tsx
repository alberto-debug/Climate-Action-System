"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    _aqiFeed: (config: any) => void
  }
}

export function AirQualityVisualization() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "//feed.aqicn.org/feed/nairobi/en/feed.v1.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window._aqiFeed({
        container: "city-aqi-container",
        city: "nairobi",
        lang: "en",
      })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div id="city-aqi-container"></div>
}

