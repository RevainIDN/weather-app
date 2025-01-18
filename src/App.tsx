import { useState, useEffect } from 'react'
import './App.css'
import { CurrentCityDatas, ForecastCityDatas, transformCurrentWeatherData, transformForecastWeatherData } from './types'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import CityWeather from './components/CityWeather'
import DailyForecast from './components/DailyForecast'

export default function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentCityDatas | null>(null);
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastCityDatas | null>(null);
  const [currentCity, setCurrentCity] = useState<string>('London');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const handleInputText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentCity(e.currentTarget.value);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnits(e.target.checked ? 'imperial' : 'metric');
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      try {
        const responseCurrentWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?units=${units}&lang=en&q=${currentCity}&appid=${apiKey}`
        );
        const currentData = await responseCurrentWeather.json();

        const transformedCurrentData = transformCurrentWeatherData(currentData);
        setCurrentWeatherData(transformedCurrentData);

        const responseForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?units=${units}&q=${currentCity}&appid=${apiKey}`
        );
        const forecastData = await responseForecast.json();

        const transformedForecastData = transformForecastWeatherData(forecastData);
        setForecastWeatherData(transformedForecastData);
      } catch (error) {
        console.error('An error occurred while retrieving data: ', error);
      }
    }

    fetchWeatherData();
  }, [currentCity, units])
  console.log(currentWeatherData);
  console.log(forecastWeatherData);

  return (
    <div className='weather-app'>
      <Header
        handleInputText={handleInputText}
        handleChange={handleChange}
      />
      <div className='first-weather-forecast'>
        <CurrentWeather
          currentWeatherData={currentWeatherData}
          units={units}
        />
        <HourlyForecast
          forecastWeatherData={forecastWeatherData}
        />
      </div>
      <div className='second-weather-forecast'>
        <CityWeather />
        <DailyForecast />
      </div>
    </div>
  )
}
