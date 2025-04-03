import React from 'react';


const Results = ({ userName, userAnswer, correctAnswer, onStartOver }) => {
  const isCorrect = userAnswer === correctAnswer;

  return (
    <div className="questionnaire">
      <h3>{userName}, you answered {isCorrect ? 'correctly' : 'incorrectly'}!</h3>
      {!isCorrect && (
        <p>The correct answer was: {correctAnswer}</p>
      )}
      <button className="button" onClick={onStartOver}>Try Another Question</button>
    </div>
  );
};

export default Results;
