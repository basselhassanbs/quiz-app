import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-900 lg:py-4'>
      <div className='flex w-full flex-wrap items-center justify-between px-3'>
        <div className='ms-2'>
          <button
            onClick={() => navigate('/')}
            className='text-xl text-black dark:text-white'
          >
            Quiz App
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
