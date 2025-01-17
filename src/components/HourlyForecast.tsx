import '../styles/HourlyForecast.css'
import { ForecastCityDatas } from '../types'
import { formatTime } from '../GeneralFunctions';

interface HourlyForecastProps {
	forecastWeatherData: ForecastCityDatas | null;
}

export default function HourlyForecast({ forecastWeatherData }: HourlyForecastProps) {
	return (
		<ul className='hourly-forecast-list'>
			{forecastWeatherData ? (
				forecastWeatherData.list.map((forecast, index) => {
					if (index >= 8) {
						return;
					}
					const formattedTime = formatTime(forecast.dt, forecastWeatherData.city.timezone);
					return (
						<li key={index} className='hourly-forecast-item'>
							<h1 className='item-weather-time'>{formattedTime}</h1>
							<div className='item-weather-cont'>
								<img className='item-weather-img' src={`${forecast.weather[0].icon}.png`} alt={forecast.weather[0].main} />
								<h2 className='item-weather-title'>{forecast.weather[0].main}</h2>
							</div>
							<h2 className='item-weather-degree'>{Math.round(forecast.main.temp)}°</h2>
						</li>
					)
				})
			) : (
				<p>No hourly forecast</p>
			)}
		</ul>
	)
}