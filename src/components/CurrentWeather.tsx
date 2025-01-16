import '../styles/CurrentWeather.css'

export default function CurrentWeather() {
	return (
		<div className='current-weather'>
			<div className='current-weather-degrees'>
				<h1 className='current-degree'>-1°</h1>
				<div className='current-name-cont'>
					<h2 className='current-name'>Helsinki</h2>
					<small className='current-time'>11:45 AM</small>
				</div>
			</div>
			<div className='current-weather-info'>
				<div className='current-weather-cont'>
					<img className='current-weather-img' src="13d.png" alt="" />
					<h2 className='current-weather-text city-weather'>Snow</h2>
				</div>
				<div className='current-weather-cont'>
					<img className='current-wind-img' src="wind.png" alt="" />
					<h2 className='current-wetahter-text city-wind'>5.14 m/s</h2>
				</div>
			</div>
			<div className='current-weather-feellike'>
				<h2 className='current-feellike'>Feel like: -4 °C</h2>
				<h2 className='current-feellike'>-1° to 3°</h2>
			</div>
		</div>
	)
}