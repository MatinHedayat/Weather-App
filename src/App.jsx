import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Rings } from 'react-loader-spinner';
import { FiDelete } from 'react-icons/fi';

export default function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('Tehran');
  const [queryUnit, setQueryUnit] = useState('metric');
  const [unit, setUnit] = useState('°C');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(weather)

  const handleChangeUnit = () => {
    queryUnit === 'metric' ? setQueryUnit('imperial') : setQueryUnit('metric');
  };

  const detailValues = [
    { title: 'Feels Like', value: weather.main?.feels_like, unit: unit },
    { title: 'Humidity', value: weather.main?.humidity, unit: '%' },
    { title: 'Min Temp', value: weather.main?.temp_min, unit: unit },
    { title: 'Max Temp', value: weather.main?.temp_max, unit: unit },
    {
      title: 'Wind Speed',
      value: weather.wind?.speed,
      unit: queryUnit === 'metric' ? 'M/S' : 'MPH',
    },
    { title: 'Pressure', value: weather.main?.pressure, unit: 'HPA' },
  ];

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a228caf6361612f8e1c1649e0f8de136`;

  const fetchWeather = async (url, queryUnit) => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axios(`${url}&units=${queryUnit}`);
      setWeather(res.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(apiUrl, queryUnit);
    queryUnit === 'metric' ? setUnit('°C') : setUnit('°F');
  }, [queryUnit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) return;
    fetchWeather(apiUrl, queryUnit);
  };

  return (
    <>
      <img
        className='w-full h-full absolute -z-10 object-cover brightness-75'
        src='back.jpg'
        alt='background'
      />

      <div className='max-w-3xl h-screen relative mx-auto'>
        <form
          className='w-4/5 absolute top-16 inset-x-1/2 -translate-x-1/2 flex justify-between backdrop-blur-sm overflow-hidden border-2 border-white/20 rounded-3xl'
          onSubmit={handleSubmit}
        >
          <button
            className='absolute w-max h-max inset-y-1/2 -translate-y-1/2 right-[24%] text-white/30 text-xl'
            type='button'
            onClick={() => {
              setLocation('');
              setError(true);
            }}
          >
            <FiDelete />
          </button>

          <input
            className='bg-transparent w-4/5 text-white caret-white placeholder-white/50 px-6 py-4 tracking-widest outline-none'
            type='text'
            value={location}
            placeholder='Enter location ...'
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className='bg-white/20 w-1/5 flex items-center justify-center'>
            <CiSearch className='text-white text-2xl' />
          </button>
        </form>

        {isLoading ? (
          <Rings
            width='200'
            height='200'
            color='white'
            wrapperClass='absolute w-max top-80 inset-x-1/2 -translate-x-1/2'
          />
        ) : error ? (
          <p className='text-white/60 absolute w-max top-56 inset-x-1/2 -translate-x-1/2'>
            Something went wrong ...
          </p>
        ) : (
          <>
            <div className='w-4/5 absolute top-44 inset-x-1/2 -translate-x-1/2 text-white'>
              <div>
                <span>{weather.name}</span>
                <span className='bg-white/10 text-xs px-3 py-1 ml-2 backdrop-blur-md rounded-lg'>
                  {weather.sys?.country}
                </span>
              </div>
              <h2
                className='text-7xl font-bold mt-2'
                onClick={handleChangeUnit}
              >
                {weather.main?.temp.toFixed()}
                {unit}
              </h2>
              <p className='absolute top-3 -right-8 flex items-center text-lg font-medium -rotate-90'>
                {weather.weather ? weather.weather[0]?.main : ''}
                <img
                  className='w-16 h-16 ml-2'
                  src={`https://openweathermap.org/img/wn/${
                    weather.weather ? weather.weather[0]?.icon : ''
                  }@2x.png`}
                  alt=''
                />
              </p>
              <div className='flex flex-wrap items-center justify-between gap-2 mt-8'>
                <div className='text-sm flex items-center gap-2'>
                  <p>Longitude :</p>
                  <p className='bg-white/10 px-2 py-1 backdrop-blur-sm rounded-lg'>
                    {weather.coord?.lon}
                  </p>
                </div>
                <div className='text-sm flex items-center gap-2'>
                  <p>Latitude :</p>
                  <p className='bg-white/10 px-2 py-1 backdrop-blur-sm rounded-lg'>
                    {weather.coord?.lat}
                  </p>
                </div>
              </div>
            </div>

            <div className='w-4/5 absolute bottom-28 inset-x-1/2 -translate-x-1/2 text-white flex flex-wrap items-center justify-center gap-4'>
              {detailValues.map((item) => (
                <div
                  className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'
                  key={item.title}
                >
                  <p className='text-xl font-semibold'>
                    {item.value}
                    <span className='text-white/90 ml-1'>{item.unit}</span>
                  </p>
                  <p className='text-lg text-white/80'>{item.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
