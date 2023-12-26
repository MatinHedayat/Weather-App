import { CiSearch } from 'react-icons/ci';

export default function App() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=city&appid=a228caf6361612f8e1c1649e0f8de136`;

  return (
    <>
      <img
        className='w-full h-full absolute -z-10 object-cover brightness-75'
        src='back.jpg'
        alt='background'
      />

      <div className='max-w-3xl h-screen relative mx-auto'>
        <form className='w-4/5 absolute top-20 inset-x-1/2 -translate-x-1/2 flex backdrop-blur-sm overflow-hidden border-2 border-white/20 rounded-3xl'>
          <input
            className='bg-transparent w-4/5 text-white caret-white placeholder-white/50 px-6 py-4 tracking-widest outline-none'
            type='text'
            placeholder='Enter location ...'
          />
          <button className='bg-white/20 w-1/5 flex items-center justify-center'>
            <CiSearch className='text-white text-2xl' />
          </button>
        </form>

        <div className='w-4/5 absolute top-52 inset-x-1/2 -translate-x-1/2 text-white'>
          <div>
            <span>Tehran</span>
            <span className='bg-white/10 text-xs px-3 py-1 ml-2 backdrop-blur-md rounded-lg'>
              IR
            </span>
          </div>
          <h2 className='text-7xl font-bold mt-2 mb-6'>30°C</h2>
          <p className='absolute top-5 -right-2 text-lg font-medium -rotate-90'>
            Sunny
          </p>
          <p className='bg-white/20 text-sm text-white w-max px-4 py-2 backdrop-blur-md rounded-xl'>
            Tue Dec 26 2023 &nbsp; 11:56:06
          </p>
          <div className='flex flex-wrap items-center justify-between gap-2 mt-6'>
            <div className='text-sm flex items-center gap-2'>
              <p>Longitude :</p>
              <p className='bg-white/10 px-2 py-1 backdrop-blur-sm rounded-lg'>
                51.4215
              </p>
            </div>
            <div className='text-sm flex items-center gap-2'>
              <p>Latitude :</p>
              <p className='bg-white/10 px-2 py-1 backdrop-blur-sm rounded-lg'>
                35.6944
              </p>
            </div>
          </div>
        </div>

        <div className='w-4/5 absolute bottom-28 inset-x-1/2 -translate-x-1/2 text-white flex flex-wrap items-center justify-center gap-4'>
          <div className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'>
            <span className='text-xl font-semibold'>28°C</span>
            <span className='text-lg text-white/80'>Feels Like</span>
          </div>

          <div className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'>
            <span className='text-xl font-semibold'>28%</span>
            <span className='text-lg text-white/80'>Humidity</span>
          </div>

          <div className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'>
            <span className='text-xl font-semibold'>25°C</span>
            <span className='text-lg text-white/80'>Min Temp</span>
          </div>

          <div className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'>
            <span className='text-xl font-semibold'>32°C</span>
            <span className='text-lg text-white/80'>Max Temp</span>
          </div>

          <div className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'>
            <span className='text-xl font-semibold'>10MPH</span>
            <span className='text-lg text-white/80'>Wind Speed</span>
          </div>

          <div className='bg-white/20 w-[45%] flex flex-col items-center gap-1 backdrop-blur-sm py-4 rounded-2xl'>
            <span className='text-xl font-semibold'>1020</span>
            <span className='text-lg text-white/80'>Pressure</span>
          </div>
        </div>
      </div>
    </>
  );
}
