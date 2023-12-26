import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Rings } from 'react-loader-spinner';

export default function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('Tehran');
  const [unit, setUnit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const detailValues = [
    { title: 'Feels Like', value: weather.main?.feels_like, unit: '°C' },
    { title: 'Humidity', value: weather.main?.humidity, unit: '%' },
    { title: 'Min Temp', value: weather.main?.temp_min, unit: '°C' },
    { title: 'Max Temp', value: weather.main?.temp_max, unit: '°C' },
    { title: 'Wind Speed', value: weather.wind?.speed, unit: 'M/S' },
    { title: 'Pressure', value: weather.main?.pressure, unit: 'HPA' },
  ];

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a228caf6361612f8e1c1649e0f8de136${unit}`;

  const fetchWeather = async (url) => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axios(url);
      setWeather(res.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(apiUrl);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) return;
    fetchWeather(apiUrl);
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
          className='w-4/5 absolute top-20 inset-x-1/2 -translate-x-1/2 flex backdrop-blur-sm overflow-hidden border-2 border-white/20 rounded-3xl'
          onSubmit={handleSubmit}
        >
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
            <div className='w-4/5 absolute top-52 inset-x-1/2 -translate-x-1/2 text-white'>
              <div>
                <span>{weather.name}</span>
                <span className='bg-white/10 text-xs px-3 py-1 ml-2 backdrop-blur-md rounded-lg'>
                  {weather.sys?.country}
                </span>
              </div>
              <h2 className='text-7xl font-bold mt-2 mb-6'>
                {weather.main?.temp.toFixed()}°C
              </h2>
              <p className='absolute top-5 -right-2 text-lg font-medium -rotate-90'>
                {weather.weather ? weather.weather[0]?.main : ''}
              </p>
              <p className='bg-white/20 text-sm text-white w-max px-4 py-2 backdrop-blur-md rounded-xl'>
                {new Date().toDateString(weather.timezone)} &nbsp;{' '}
                {new Date().toTimeString(weather.timezone).slice(0, 9)}
              </p>
              <div className='flex flex-wrap items-center justify-between gap-2 mt-6'>
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
