import '../styles/Header.css'
import search from '/Search.svg'

export default function Header() {
	return (
		<div className='header'>
			<div className='input-cont'>
				<img className='input-img' src={search} alt="Search" />
				<input className='input' type="text" maxLength={30} placeholder='Search city...' />
			</div>
			<div className='switch-cont'>
				<label className='switch'>
					<input className='switch-input' type="checkbox" />
					<span className='switch-slider'>
						<span className='switch-text switch-text-left'>°C</span>
						<span className='switch-text switch-text-right'>°F</span>
					</span>
				</label>
			</div>
		</div>
	)
}