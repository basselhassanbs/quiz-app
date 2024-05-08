import Navbar from './components/Navbar';
import QuizAdd from './components/QuizEditor';
import QuizList from './components/QuizList';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='p-4'>
        <Routes>
          <Route path='/' element={<QuizList />} />
          <Route path='/add' element={<QuizAdd />} />
          <Route path='/quiz/:id' element={<QuizAdd />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
