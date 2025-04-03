import React, { useState } from 'react';


const HomePage = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }; 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!formData.name || !formData.category || !formData.difficulty) {
            setError('All fields are required');
            return;
            }; 
    
    setError('');
    onSubmit(formData);
}; 


    return (
        <div className="questionnaire"> 
            <h2>Welcome to this Quiz App!</h2>
            <h3><strong>Instructions:</strong> Fill out the form below to start your quiz!</h3>

            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}

                <div> 
                    <label><strong>Your Name:</strong></label>
                    <br />
                    <input 
                    className="input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    />
                    </div>

                    <div> 
                        <p>
                        <label><strong>Category:</strong></label>
                        <br /> 
                        <select
                        className="input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        >
                            <option value="">Select a Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="18">Science: Computers</option>
                            <option value="22">Geography</option>
                            <option value="20">Mythology</option>
                            <option value="random">Dealer's Choice (Random)</option> {/* Chose to add a randomized category for more practice. */}
                        </select>
                        </p> 
                        </div> 


                        <div>
                            <p>
                            <label><strong>Difficulty:</strong></label>
                            <br />
                            <select 
                            className="input"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}>
                                <option value="">Select a Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            </p>
                            </div> 

                            <button className="button" type="submit">Start Quiz</button>
                            </form> 
        </div> 
    ); 
}; 

export default HomePage; 
