"use client";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { WeatherData } from "@/interfaces/weatherData"; // <- import here

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => (
        <div style={{ height: "500px", width: "100%" }}>Loading map...</div>
    ),
});

export default function MapWrapper() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handlePointClick = async (coords: [number, number]) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) throw new Error("Failed to fetch weather data");

            const data: WeatherData = await response.json();
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const formatTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleTimeString();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <Map onPointClick={handlePointClick} />

            {weather && (
                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "350px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        background: "#f9f9f9",
                    }}
                >
                    <h2>
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <p>
                        <strong>Condition:</strong> {weather.weather[0].main} ({weather.weather[0].description})
                    </p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        style={{ width: "60px", height: "60px" }}
                    />
                    <p>
                        <strong>Temperature:</strong> {weather.main.temp}°C (feels like {weather.main.feels_like}°C)
                    </p>
                    <p>
                        <strong>Min/Max:</strong> {weather.main.temp_min}°C / {weather.main.temp_max}°C
                    </p>
                    <p>
                        <strong>Humidity:</strong> {weather.main.humidity}% | <strong>Pressure:</strong> {weather.main.pressure} hPa
                    </p>
                    <p>
                        <strong>Wind:</strong> {weather.wind.speed} m/s at {weather.wind.deg}° {weather.wind.gust ? `(gust ${weather.wind.gust} m/s)` : ""}
                    </p>
                    <p>
                        <strong>Clouds:</strong> {weather.clouds.all}% | <strong>Visibility:</strong> {weather.visibility} m
                    </p>
                    <p>
                        <strong>Sunrise:</strong> {formatTime(weather.sys.sunrise)} | <strong>Sunset:</strong> {formatTime(weather.sys.sunset)}
                    </p>
                </div>
            )}
        </div>
    );
}
