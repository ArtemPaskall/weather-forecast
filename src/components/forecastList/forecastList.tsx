import './forecastList.scss'
import { ForecastSliceState } from '../../types/types'
import { useAppSelector } from '../../store/hooks';
import { ForecastCard } from '../forecastCard/forecastCard';
import { SearchBar } from '../searchBar/serchBar';
const Logo = require('../../images/logo.png');

export const ForecastList: React.FC = () => {
  const forecast = useAppSelector((state: ForecastSliceState) => state.forecast);

  return (
    <div className='forecast-list'>
      <div className='forecast-list__header'>
        <img src={Logo} alt="Logo" className='logo-img'/>
        <SearchBar />
      </div>
        <ul className='forecast-list__items'>
          {forecast.map(forecast => (
            <ForecastCard 
              key={Math.random()}
              {...forecast}
            />
          ))}
        </ul>
    </div>
  )
}