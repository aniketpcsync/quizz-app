'use client';

import { useState } from 'react';

export default function CreateQuiz() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newOptions, setNewOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const handleQuestionChange = (e) => {
        setNewQuestion(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...newOptions];
        updatedOptions[index] = e.target.value;
        setNewOptions(updatedOptions);
    };

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: newQuestion, options: newOptions, correctAnswer }]);
        setNewQuestion('');
        setNewOptions(['', '', '', '']);
        setCorrectAnswer(0);
    };

    function convertQuizData(quizData) {
        const { title, questions } = quizData;

        const convertedQuestions = questions.map((q, index) => {
            return {
                index: index,
                question: q.question,
                options: q.options
            };
        });

        const answers = questions.reduce((acc, q, index) => {
            acc[index] = parseInt(q.correctAnswer, 10);
            return acc;
        }, {});

        return {
            id: 1000,
            title: title,
            questions: convertedQuestions,
            answers: answers
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newQuiz = {
            title,
            questions
        };

        const formattedQuiz = convertQuizData(newQuiz)

        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedQuiz),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Quiz created successfully!');
            } else {
                alert(data.error || 'Failed to create quiz');
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className="text-black bg-gray-100 min-h-screen flex justify-center items-center py-4">
            <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black mb-4">Create a New Quiz</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-semibold text-black">Quiz Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter quiz title"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-black">Add Questions:</h3>
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={handleQuestionChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter question"
                        />
                        {newOptions.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                                placeholder={`Option ${index + 1}`}
                            />
                        ))}
                        <div className="mt-2">
                            <label className="block text-black">Correct Answer (0-3):</label>
                            <input
                                type="number"
                                value={correctAnswer}
                                onChange={handleCorrectAnswerChange}
                                className="w-20 p-2 border border-gray-300 rounded-lg"
                                min={0}
                                max={3}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md">
                            Add Question
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-green-500 text-white rounded-lg shadow-md mt-4">
                            Create Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}