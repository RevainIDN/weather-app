import '../styles/CityWeather.css'

export default function CityWeather() {
	return (
		<div className='city-weather'>
			<h1 className='forecast-title'>Other large cities</h1>
			<ul className='cities-list'>
				<li className='city-item'>
					<div className='city-country-info'>
						<h1 className='city-weather-text city-weather-country'>US</h1>
						<h2 className='city-weather-text city-weather-town'>New York</h2>
						<small className='city-weather-text city-weather-condition'>Clear sky</small>
					</div>
					<div className='city-weather-info'>
						<img className='city-weather-img' src="01d.png" alt="" />
						<h2 className='city-weather-degree'>14°</h2>
					</div>
				</li>
			</ul>
		</div>
	)
}