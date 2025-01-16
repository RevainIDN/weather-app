import '../styles/DailyForecast.css'

export default function DailyForecast() {
	return (
		<div className='daily-forecast'>
			<h1 className='forecast-title'>5-day forecast</h1>
			<ul className='daily-forecast-list'>
				<li className='daily-forecast-item'>
					<h1 className='forecast-day'>Today</h1>
					<div className='forecast-weather-cont'>
						<img className='forecast-img' src="03d.png" alt="" />
						<h2 className='forecast-weather'>Clouds</h2>
					</div>
					<div className='forecast-degrees-cont'>
						<p className='forecast-degree forecast-degree-min'>-1°</p>
						<span className='forecast-scale'>
							<span className='forecast-under-scale'></span>
						</span>
						<p className='forecast-degree forecast-degree-max'>3°</p>
					</div>
				</li>
			</ul>
		</div>
	)
}