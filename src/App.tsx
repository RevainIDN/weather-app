import { useState, useEffect } from 'react'
import './App.css'
import { CurrentCityDatas, ForecastCityDatas, CitiDatas, MinMaxTempDatas, transformCurrentWeatherData, transformForecastWeatherData, transformCitiDatas, transformMinMaxTempDatas } from './types'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import CityWeather from './components/CityWeather'
import DailyForecast from './components/DailyForecast'

export default function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentCityDatas | null>(null);
  const [forecastWeatherData, setForecastWeatherData] = useState<ForecastCityDatas | null>(null);
  const [minMaxTemp, setMinMaxTemp] = useState<MinMaxTempDatas | null>(null);
  const [otherCitiesData, setOtherCitiesData] = useState<CitiDatas[]>([]);
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

  const firstApiKey = import.meta.env.VITE_FIRST_WEATHER_API_KEY;
  const secondApiKey = import.meta.env.VITE_SECOND_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responseCurrentWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?units=${units}&lang=en&q=${currentCity}&appid=${firstApiKey}`
        );
        const currentData = await responseCurrentWeather.json();

        const transformedCurrentData = transformCurrentWeatherData(currentData);
        setCurrentWeatherData(transformedCurrentData);

        const responseForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&units=${units}&cnt=40&appid=${firstApiKey}`
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

  useEffect(() => {
    const fetchMinMaxTempData = async () => {
      try {
        const responseMinMaxTemp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${secondApiKey}&q=${currentCity}&days=5&aqi=no&alerts=yes`);
        const minMaxTempData = await responseMinMaxTemp.json();

        const transformedMinMaxTempData = transformMinMaxTempDatas(minMaxTempData);
        setMinMaxTemp(transformedMinMaxTempData);
      } catch (error) {
        console.error('An error occurred while retrieving data: ', error);
      }
    }
    fetchMinMaxTempData();
  }, [currentCity])

  useEffect(() => {
    const fetchOtherCitiesData = async () => {
      try {
        const cities = ['New York', 'Copenhagen', 'Ho Chi Minh City'];
        const responses = await Promise.all(
          cities.map(city =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lang=en&q=${city}&appid=${firstApiKey}`)
          )
        );

        const data = await Promise.all(responses.map(res => res.json()));
        setOtherCitiesData(data.map(transformCitiDatas));
      } catch (error) {
        console.error('An error occurred while retrieving data: ', error);
      }
    }

    fetchOtherCitiesData();
  }, [units])

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
        <CityWeather
          otherCitiesData={otherCitiesData}
        />
        <DailyForecast
          forecastWeatherData={forecastWeatherData}
          minMaxTemp={minMaxTemp}
          units={units}
        />
      </div>
    </div>
  )
}
