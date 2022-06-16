import { useParams } from "react-router-dom";
import { useAppSelector } from '../../store/hooks';
import { ForecastSliceState } from '../../types/types';
import "./forecastPage.scss";
const Logo = require('../../images/logo.png');
const Sunrise = require('../../images/sunrise_morning_icon.png');
const Sunset = require('../../images/sunset_evening_icon.png');

export const ForecastPage: React.FC = () => {
const param = useParams();

const forecasts = useAppSelector((state: ForecastSliceState) => state.forecast);
const forecast = forecasts.find(forecast => forecast.name === param.name)

const dateNow = new Date();

function getTimeSunCycle(date: string) {
  const d = new Date(+(`${date}000`));

  return `${d.getHours()}:${d.getMinutes()}`;
}

function levelTemp(temp: number) {
  if (temp >= 0) {
    return <span className='forecast-page__avg-temp--average-digit'>+</span>
  } else {
    return <span className='forecast-page__avg-temp--average-digit'>-</span>
  }
}

console.log((forecast));

  return (
    <>
       <div className='forecast-list'>
        <div className='forecast-list__header'>
          <img src={Logo} alt="Logo" className='logo-img'/>
          <p className='forecast-list__city-name'>
            {param.name}  {forecast !== undefined && <span>{forecast.sys.country}</span>} 
          </p>
        </div>
      </div>
      <div className='forecast-page'>
        {forecast !== undefined && (
          <div className='forecast-page__wrap'>
            <div>
              <p className='forecast-page__date'>{ dateNow.toDateString() }</p>
              <div className='forecast-page__avg-temp'>
                <div className='forecast-page__sunrise'>
                  <img src={Sunrise} alt="Sunrise" className='forecast-page__sunrise--img'/>
                  <p>Sunrise</p>
                  {`${getTimeSunCycle(forecast.sys.sunrise)}`}
                </div>
                <div  className='forecast-page__avg-temp--average'>
                  {levelTemp(+forecast.main.temp)}
                  {(+forecast.main.temp).toFixed(1)}
                </div>
                <div className='forecast-page__sunset'>
                  <img src={Sunset} alt="Sunset" className='forecast-page__sunrise--img'/>
                  <p>Sunset</p>
                  {`${getTimeSunCycle(forecast.sys.sunset)}`}
                </div>
              </div>
              <div className='forecast-page__feels'>
                {`Feels: ${Math.round(+forecast.main.feels_like)}`}
              </div>
              <div className='forecast-page__description'>
                {`${forecast.weather[0].description}`}
              </div>
            </div>
            <div className='forecast-page__bottom-bar'>
              <div className='forecast-page__bottom-item'>
                <p className='forecast-page__bottom-description'>Wind</p>
                <p className='forecast-page__bottom-value'>{`${forecast.wind.speed}`}</p>
                <p className='forecast-page__bottom-value--descriptoin'>m/s</p>
              </div>
              <div className='forecast-page__bottom-item'>
                <p className='forecast-page__bottom-description'>Pressure</p>
                <p className='forecast-page__bottom-value'>  {`${forecast.main.pressure}`}</p>
                <p className='forecast-page__bottom-value--descriptoin'>millibars </p>
              </div>
              <div className='forecast-page__bottom-item'>
                <p className='forecast-page__bottom-description'>Humidity</p>
                <p className='forecast-page__bottom-value'> {`${forecast.main.humidity}`}</p>
                <p className='forecast-page__bottom-value--descriptoin'>%</p>
              </div>
              <div className='forecast-page__bottom-item'>
                <p className='forecast-page__bottom-description'>Temp_max</p>
                <p className='forecast-page__bottom-value'>{`${forecast.main.temp_max}`}</p>
                <p className='forecast-page__bottom-value--descriptoin'>&#8451;</p>
              </div>
              <div className='forecast-page__bottom-item'>
                <p className='forecast-page__bottom-description'>Temp_min</p>
                <p className='forecast-page__bottom-value'> {`${forecast.main.temp_min}`}</p>
                <p className='forecast-page__bottom-value--descriptoin'>&#8451;</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}