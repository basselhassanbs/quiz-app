import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(JSON.parse(localStorage.getItem('quizzes')));
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='font-bold text-2xl'>Quizzes</h1>
        <button
          className='p-2 rounded border-2'
          onClick={() => navigate('/add')}
        >
          Add new Quiz
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        {quizzes &&
          quizzes.map((quiz) => (
            <div className='flex justify-between items-center p-2 border-2 rounded'>
              <div>{quiz.title}</div>
              <button
                className='p-1 rounded'
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Edit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuizList;
