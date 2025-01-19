import '../styles/DailyForecast.css'
import { useState, useEffect } from 'react';
import { ForecastCityDatas, ForecastList, MinMaxTempDatas } from '../types'

interface DailyForecastProps {
	forecastWeatherData: ForecastCityDatas | null;
	minMaxTemp: MinMaxTempDatas | null;
	units: 'metric' | 'imperial';
}

export default function DailyForecast({ forecastWeatherData, minMaxTemp, units }: DailyForecastProps) {
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
		}
	}, [forecastWeatherData]);

	useEffect(() => {
		if (minMaxTemp && minMaxTemp.forecast.forecastday.length > 0) {
			const allMinTemps = minMaxTemp.forecast.forecastday.map((day) => day.day.mintemp_c);
			const allMaxTemps = minMaxTemp.forecast.forecastday.map((day) => day.day.maxtemp_c);

			const overallMinTemp = Math.min(...allMinTemps);
			const overallMaxTemp = Math.max(...allMaxTemps);

			setOverallMinTemp(overallMinTemp);
			setOverallMaxTemp(overallMaxTemp);
		}
	}, [minMaxTemp]);

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
				{fiveDayForecast.length > 0 ? (
					fiveDayForecast.map((forecast, index) => {
						if (overallMinTemp === null || overallMaxTemp === null) return null;

						const dayData = minMaxTemp?.forecast.forecastday[index];
						const range = overallMaxTemp - overallMinTemp;
						const normalizedMinTemp = overallMinTemp !== null ? overallMinTemp : 0;
						const normalizedRange = range > 0 ? range : 1;

						const left = ((dayData?.day.mintemp_c || 0) - normalizedMinTemp) / normalizedRange * 100;
						const width = ((dayData?.day.maxtemp_c || 0) - (dayData?.day.mintemp_c || 0)) / normalizedRange * 100;

						const minScaleWidth = 2;
						const adjustedWidth = width < minScaleWidth ? minScaleWidth : width;

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
									<p className='forecast-degree forecast-degree-min'>{units === 'metric'
										? Math.round(dayData?.day.mintemp_c || 0)
										: Math.round(dayData?.day.mintemp_f || 0)}°</p>
									<span className='forecast-scale'>
										<span
											className='forecast-under-scale'
											style={{
												left: `${left}%`,
												width: `${adjustedWidth}%`
											}}
										></span>
									</span>
									<p className='forecast-degree forecast-degree-max'>{units === 'metric'
										? Math.round(dayData?.day.maxtemp_c || 0)
										: Math.round(dayData?.day.maxtemp_f || 0)}°</p>
								</div>
							</li>
						)
					})
				) : (
					<div className='load-cont'>
						<div className='load'></div>
					</div>
				)}
			</ul>
		</div>
	)
}