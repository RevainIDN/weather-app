import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import CityWeather from './components/CityWeather'
import DailyForecast from './components/DailyForecast'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='weather-app'>
      <Header />
      <div className='weather-forecast'>
        <CurrentWeather />
        <HourlyForecast />
      </div>
      <div className='weather-forecast'>
        <CityWeather />
        <DailyForecast />
      </div>
    </div>
  )
}
