interface CurrentTemperatureInformation {
	feels_like: number;
	temp: number;
	temp_max: number;
	temp_min: number;
}

interface CurrentWeatherInformation {
	icon: string;
	main: string;
}

interface CurrentWindInformation {
	speed: number;
}

export interface CurrentCityDatas {
	dt: number;
	id: number;
	main: CurrentTemperatureInformation;
	name: string;
	timezone: number,
	weather: CurrentWeatherInformation[];
	wind: CurrentWindInformation;
}

interface ForecastCityInfo {
	name: string;
}

interface ForecastList {
	dt: number;
	dt_txt: string;
	main: CurrentTemperatureInformation;
	weather: CurrentWeatherInformation[];
}

export interface ForecastCityDatas {
	city: ForecastCityInfo;
	list: ForecastList[];
}

export function transformCurrentWeatherData(data: any): CurrentCityDatas {
	return {
		dt: data.dt,
		id: data.id,
		main: {
			feels_like: data.main.feels_like,
			temp: data.main.temp,
			temp_max: data.main.temp_max,
			temp_min: data.main.temp_min,
		},
		name: data.name,
		timezone: data.timezone,
		weather: data.weather.map((item: any) => ({
			icon: item.icon,
			main: item.main,
		})),
		wind: {
			speed: data.wind.speed,
		},
	};
}

export function transformForecastWeatherData(data: any): ForecastCityDatas {
	return {
		city: {
			name: data.city.name,
		},
		list: data.list.map((item: any) => ({
			dt: item.dt,
			dt_txt: item.dt_txt,
			main: {
				feels_like: item.main.feels_like,
				temp: item.main.temp,
				temp_max: item.main.temp_max,
				temp_min: item.main.temp_min,
			},
			weather: item.weather.map((item: any) => ({
				icon: item.icon,
				main: item.main,
			}))
		}))
	};
}