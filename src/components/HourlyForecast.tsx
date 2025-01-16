import '../styles/HourlyForecast.css'

export default function HourlyForecast() {
	return (
		<ul className='hourly-forecast-list'>
			<li className='hourly-forecast-item'>
				<h1 className='item-weather-time'>9:00 AM</h1>
				<div className='item-weather-cont'>
					<img className='item-weather-img' src="13d.png" alt="" />
					<h2 className='item-weather-title'>Snow</h2>
				</div>
				<h2 className='item-weather-degree'>-10°</h2>
			</li>
		</ul>
	)
}