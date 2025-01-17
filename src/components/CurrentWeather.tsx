import '../styles/CurrentWeather.css'
import { CurrentCityDatas } from '../types'
import { formatTime } from '../GeneralFunctions';

interface CurrentWeatherProps {
	currentWeatherData: CurrentCityDatas | null;
	units: 'metric' | 'imperial';
}

export default function CurrentWeather({ currentWeatherData, units }: CurrentWeatherProps) {
	const formattedTime = currentWeatherData
		? formatTime(currentWeatherData.dt, currentWeatherData.timezone)
		: '';

	return (
		<div className='current-weather'>
			<div className='current-weather-degrees'>
				<h1 className='current-degree'>{Math.round(currentWeatherData?.main.temp || 0)}°</h1>
				<div className='current-name-cont'>
					<h2 className='current-name'>{currentWeatherData?.name}</h2>
					<small className='current-time'>{formattedTime}</small>
				</div>
			</div>
			<div className='current-weather-info'>
				<div className='current-weather-cont'>
					<img className='current-weather-img' src={`${currentWeatherData?.weather[0].icon}.png`} alt="" />
					<h2 className='current-weather-text city-weather'>{currentWeatherData?.weather[0].main}</h2>
				</div>
				<div className='current-weather-cont'>
					<img className='current-wind-img' src="wind.png" alt="" />
					<h2 className='current-weather-text city-wind'>{currentWeatherData?.wind.speed} m/s</h2>
				</div>
			</div>
			<div className='current-weather-feellike'>
				<h2 className='current-feellike'>Feel like: {Math.round(currentWeatherData?.main.feels_like || 0)} {units === 'metric' ? '°C' : '°F'}</h2>
				<h2 className='current-feellike'>{Math.round(currentWeatherData?.main.temp_min || 0)}° to {Math.round(currentWeatherData?.main.temp_max || 0)}°</h2>
			</div>
		</div>
	)
}