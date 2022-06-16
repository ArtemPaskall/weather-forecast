
import './forecastCard.scss';
import { Forecast } from '../../types/types';
import { useAppDispatch } from '../../store/hooks';
import { removeForecast } from '../../store/forecastSlice';
import { updateForecast } from '../../api/api';
import { Link } from 'react-router-dom';
const Cross = require('../../images/remove_trash_close_icon.png');

export const ForecastCard: React.FC<Forecast> = (forecast) => {
  const dispatch = useAppDispatch();

  return (
    <li className='forecast-card'>
      <p
        className='forecast-card__title'
      >
        {forecast.name}
      </p>
      <div className='forecast-card__weather'>
        <p className='forecast-card__weather-tittle'>
          {forecast.weather[0].main}
        </p>
        <img 
          className='forecast-card__weather-img'
          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
          alt='Weather forecast'  
        />
      </div>
      <div className='forecast-card__temperature'>
        <p className='forecast-card__temperature-tittle'>
          Temp:
        </p>
        <p className='forecast-card__temperature-value'>
          {Math.round(+forecast.main.temp)}
        </p>
      </div>
      <button
        className='forecast-card__button-update'
        onClick={() => {
        dispatch(updateForecast(forecast.name))
        }}
      >
        Update
      </button>
      <button
        className='forecast-card__button-remove'
        onClick={() => {
        dispatch(removeForecast(forecast.name))
        }}
      >
        <img src={Cross} alt='Cross' className='forecast-card__button-remove--cross'></img>
      </button>
      <Link 
        className='forecast-card__learnMore'
        to={`forecast-for-${forecast.name}`}>
        Learn more...
      </Link>
    </li>
  )
}