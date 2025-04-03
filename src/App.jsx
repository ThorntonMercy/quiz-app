import React, { useState } from 'react';
import HomePage from './components/HomePage.jsx';
import QuizQuestions from './components/QuizQuestions.jsx';
import Results from './components/Results.jsx';
import './App.css';

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleFormSubmit = (formData) => {
    setQuizData(formData);
    setIsAnswerSubmitted(false); // Reset the state when starting a new quiz
  };

  const handleAnswerSubmit = (answer) => {
    setUserAnswer(answer);
    setIsAnswerSubmitted(true);
  };

  const handleStartOver = () => {
    setQuizData(null);
    setUserAnswer('');
    setIsAnswerSubmitted(false);
  };

  return (
    <div>
      {!quizData ? (
        <HomePage onSubmit={handleFormSubmit} />
      ) : isAnswerSubmitted ? (
        <Results
          userName={quizData.name}
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
          onStartOver={handleStartOver}
        />
      ) : (
        <QuizQuestions formData={quizData} onAnswerSubmit={handleAnswerSubmit} onAnswerRetrieved={setCorrectAnswer} />
      )}
    </div>
  );
};

export default App;