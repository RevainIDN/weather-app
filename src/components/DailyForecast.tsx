import '../styles/DailyForecast.css'
import { useState, useEffect } from 'react';
import { ForecastCityDatas, ForecastList } from '../types'

interface DailyForecastProps {
	forecastWeatherData: ForecastCityDatas | null;
}

export default function DailyForecast({ forecastWeatherData }: DailyForecastProps) {
	const [fiveDayForecast, setFiveDayForecast] = useState<ForecastList[]>([]);
	const [overallMinTemp, setOverallMinTemp] = useState<number | null>(null);
	const [overallMaxTemp, setOverallMaxTemp] = useState<number | null>(null);

	useEffect(() => {
		if (forecastWeatherData && forecastWeatherData.list.length > 0) {
			const fiveDayData = [
				forecastWeatherData.list[0],
				forecastWeatherData.list[8],
				forecastWeatherData.list[16],
				forecastWeatherData.list[24],
				forecastWeatherData.list[32]
			];
			setFiveDayForecast(fiveDayData);

			const temperatures = fiveDayData.flatMap((forecast) => [forecast.main.temp_min, forecast.main.temp_max]);
			const overallMinTemp = Math.min(...temperatures);
			const overallMaxTemp = Math.max(...temperatures);

			setOverallMinTemp(overallMinTemp);
			setOverallMaxTemp(overallMaxTemp);
		}
	}, [forecastWeatherData]);

	function getDayName(dt: number, timezone: number): string {
		const utcTime = new Date(dt * 1000);
		const localTime = new Date(utcTime.getTime() + timezone * 1000);
		const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

		const dayIndex = localTime.getDay();

		return daysOfWeek[dayIndex];
	}

	return (
		<div className='daily-forecast'>
			<h1 className='forecast-title'>5-day forecast</h1>
			<ul className='daily-forecast-list'>
				{fiveDayForecast ? (
					fiveDayForecast.map((forecast, index) => {
						if (overallMinTemp === null || overallMaxTemp === null) return null;

						const range = overallMaxTemp - overallMinTemp;
						const left = range > 0 ? ((forecast.main.temp_min - overallMinTemp) / range) * 100 : 0;
						const width = range > 0 ? ((forecast.main.temp_max - forecast.main.temp_min) / range) * 100 : 0;

						return (
							<li key={index} className='daily-forecast-item'>
								<div className='forecast-info-cont'>
									<h1 className='forecast-day'>{index === 0 ? "Today" : getDayName(forecast.dt, forecastWeatherData?.city.timezone || 0)}</h1>
									<div className='forecast-weather-cont'>
										<img className='forecast-img' src={`${forecast.weather[0].icon}.png`} alt={forecast.weather[0].main} />
										<h2 className='forecast-weather'>{forecast.weather[0].main}</h2>
									</div>
								</div>
								<div className='forecast-degrees-cont'>
									<p className='forecast-degree forecast-degree-min'>{Math.round(forecast.main.temp_min)}°</p>
									<span className='forecast-scale'>
										<span
											className='forecast-under-scale'
											style={{
												left: `${left}%`,
												width: `${width}%`
											}}
										></span>
									</span>
									<p className='forecast-degree forecast-degree-max'>{Math.round(forecast.main.temp_max)}°</p>
								</div>
							</li>
						)
					})
				) : (
					<p>No daily forecast</p>
				)}
			</ul>
		</div>
	)
}