import React, { useState, useEffect } from 'react';

const QuizQuestions = ({ formData, onAnswerSubmit, onAnswerRetrieved }) => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');

    const fetchQuestion = async (category, difficulty) => { 
        const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results.length > 0) {
                setQuestionData(data.results[0]);
            } else {
                setError('No questions found :(');
            }
        } catch (err) {
            setError('Error fetching a question, sorry!');
        }
    };

// For randomized question category
    useEffect(() => {
        if (formData.category === 'random') {
            const getRandomCategory = async () => {
                try { 
                    const response = await fetch('https://opentdb.com/api_category.php');
                    const data = await response.json();
                    const randomCategory = data.trivia_categories[Math.floor(Math.random() * data.trivia_categories.length)];

                    fetchQuestion(randomCategory.id, formData.difficulty);  
                } catch (err) {
                    setError('Error fetching a random category, sorry!');
                }
            };

            getRandomCategory();
        } else {
            fetchQuestion(formData.category, formData.difficulty);
        }
    }, [formData]);

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    // This error will pop up in the modal if the user tries to submit without selecting an answer
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            setError('You have to answer the questions, silly goose!');
            return; 
        }

        setError('');
        onAnswerSubmit(selectedAnswer);
    };

    const closeErrorModal = () => {
        setError('');
    };

    const handleModalClick = (e) => {
        // Close the modal only when clicking on the background (overlay), not inside the modal content
        if (e.target.classList.contains('error-modal')) {
            closeErrorModal();
        }
    };

    if (!questionData) {
        return <div className="questionnaire">Loading...</div>;
    }

    const { question, correct_answer, incorrect_answers } = questionData;
    const allAnswers = [...incorrect_answers, correct_answer].sort();
    onAnswerRetrieved(correct_answer);

    return (
        <div className="questionnaire">
            <h3>{question}</h3>

            <form onSubmit={handleSubmit}>
                {allAnswers.map((answer, index) => (
                    <div key={index}>
                        <input 
                            type="radio"
                            name="answer"
                            value={answer}
                            onChange={handleAnswerChange}
                        /> 
                        <label>{answer}</label>
                    </div>
                ))} 
                <button className="button" type="submit">Submit Answer</button>
            </form>

            {error && (
                <div className="error-modal" onClick={handleModalClick}>
                    <div className="modal-content">
                        <p>{error}</p>
                        <p className="return">Click anywhere to get back to the question.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;