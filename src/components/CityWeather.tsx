import '../styles/CityWeather.css'
import { CitiDatas } from '../types'

interface CityWeatherProps {
	otherCitiesData: CitiDatas[]
}

const countryNames: { [code: string]: string } = {
	US: "United States",
	VN: "Vietnam",
	DK: "Denmark",
};

function getCountryName(code: string): string {
	return countryNames[code] || code;
}

export default function CityWeather({ otherCitiesData }: CityWeatherProps) {
	return (
		<div className='city-weather'>
			<h1 className='forecast-title'>Other large cities</h1>
			<ul className='cities-list'>
				{otherCitiesData.length > 0 ? (
					otherCitiesData.map((city, index) => (
						<li key={index} className='city-item'>
							<div className='city-country-info'>
								<h1 className='city-weather-text city-weather-country'>{getCountryName(city.sys.country)}</h1>
								<h2 className='city-weather-text city-weather-town'>{city.name}</h2>
								<small className='city-weather-text city-weather-condition'>{city.weather[0].main}</small>
							</div>
							<div className='city-weather-info'>
								<img className='city-weather-img' src={`${city.weather[0].icon}.png`} alt={city.weather[0].main} />
								<h2 className='city-weather-degree'>{Math.round(city.main.temp)}°</h2>
							</div>
						</li>
					))
				) : (
					<div className='load-cont'>
						<div className='load'></div>
					</div>
				)}
			</ul>
		</div>
	)
}