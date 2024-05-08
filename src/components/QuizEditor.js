import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QuizAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quiz, setQuiz] = useState({
    id: Date.now(),
    title: '',
    description: '',
    score: '',
    questions_answers: [],
  });

  useEffect(() => {
    if (id) {
      const quizzes = JSON.parse(localStorage.getItem('quizzes'));
      setQuiz(quizzes.find((quiz) => quiz.id == id));
    }
  }, []);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: '',
      answers: [],
    };
    setQuiz({
      ...quiz,
      questions_answers: [...quiz.questions_answers, newQuestion],
    });
  };

  const handleAddAnswer = (id) => {
    const newAnswer = {
      id: Date.now(),
    };

    setQuiz({
      ...quiz,
      questions_answers: quiz.questions_answers.map((question) =>
        question.id == id
          ? { ...question, answers: [...question.answers, newAnswer] }
          : question
      ),
    });
  };

  const handleChange = (field, value) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const handleQuestionChange = (field, value, id) => {
    const updatedQuestions = quiz.questions_answers.map((q) =>
      q.id === id ? { ...q, [field]: value } : q
    );
    setQuiz({ ...quiz, questions_answers: updatedQuestions });
  };

  const handleAnswerChange = (field, value, questionId, answerId) => {
    const question = quiz.questions_answers.find((q) => q.id === questionId);

    const updatedAnswers = question.answers.map((ans) =>
      ans.id === answerId ? { ...ans, [field]: value } : ans
    );
    const updatedQuestions = quiz.questions_answers.map((q) =>
      q.id === questionId ? { ...q, answers: updatedAnswers } : q
    );

    setQuiz({ ...quiz, questions_answers: updatedQuestions });
  };

  const handleSubmit = () => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (!id) {
      localStorage.setItem('quizzes', JSON.stringify([...quizzes, quiz]));
    } else {
      const updatedQuizzes = quizzes.map((q) => (q.id === quiz.id ? quiz : q));
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    }
    navigate('/');
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-bold'>Create Quiz</h1>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <label htmlFor='title' className='w-24'>
            Title
          </label>
          <input
            id='title'
            name='title'
            className='border rounded w-full p-2'
            value={quiz.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className='flex gap-2'>
          <label htmlFor='description' className='w-24'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border rounded w-full p-2'
            value={quiz.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className='flex gap-2'>
          <label htmlFor='score' className='w-24'>
            Final Score
          </label>
          <input
            id='score'
            name='score'
            className='border rounded w-full p-2'
            value={quiz.score}
            onChange={(e) => handleChange('score', e.target.value)}
          />
        </div>

        <div className='flex gap-2'>
          <label htmlFor='url' className='w-24'>
            URL
          </label>
          <input
            id='url'
            name='url'
            className='border rounded w-full p-2'
            value={quiz.url}
            onChange={(e) => handleChange('url', e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className='flex justify-between items-center mb-4'>
          <h1>Questions</h1>
          <button className='border rounded p-2' onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          {quiz.questions_answers &&
            quiz.questions_answers.map((question, index) => (
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                  <div>Question {index + 1}</div>
                  <button
                    className='border rounded p-2'
                    onClick={() => handleAddAnswer(question.id)}
                  >
                    Add answer
                  </button>
                </div>
                <div className='flex items-center gap-2'>
                  <label className='w-28'>Question Text</label>
                  <input
                    className='border rounded p-2 w-full'
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange('text', e.target.value, question.id)
                    }
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <label className='w-28'>Feedback</label>
                  <input
                    className='border rounded p-2 w-full'
                    value={question.feedback}
                    onChange={(e) =>
                      handleQuestionChange(
                        'feedback',
                        e.target.value,
                        question.id
                      )
                    }
                  />
                </div>

                <div>
                  {question.answers &&
                    question.answers.map((answer, index) => (
                      <div className='flex flex-col gap-2'>
                        <div>Answer {index + 1}</div>
                        <input
                          className='border rounded p-2'
                          value={answer.text}
                          onChange={(e) =>
                            handleAnswerChange(
                              'text',
                              e.target.value,
                              question.id,
                              answer.id
                            )
                          }
                        />
                        <div>
                          <input
                            type='radio'
                            id='is_true'
                            value='is_true'
                            checked={answer.is_true}
                            onChange={() =>
                              handleAnswerChange(
                                'is_true',
                                true,
                                question.id,
                                answer.id
                              )
                            }
                          />
                          <label for='is_true'>True</label>
                        </div>

                        <div>
                          <input
                            type='radio'
                            id='is_false'
                            value='is_false'
                            checked={!answer.is_true}
                            onChange={() =>
                              handleAnswerChange(
                                'is_true',
                                false,
                                question.id,
                                answer.id
                              )
                            }
                          />
                          <label for='is_false'>False</label>
                        </div>
                      </div>
                    ))}
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>

      <button
        disabled={
          !quiz.title.length && !quiz.description.length && !quiz.score.length
        }
        className='border rounded p-2 w-20'
        onClick={handleSubmit}
      >
        {id ? 'Update' : 'Create'}
      </button>
    </div>
  );
};

export default QuizAdd;
