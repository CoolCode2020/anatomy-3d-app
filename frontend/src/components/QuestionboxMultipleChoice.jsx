import React from 'react';

const QuestionboxMultipleChoice = ({ question, answers, onAnswerSelected }) => {
    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">{question}</h2>
            <ul className="space-y-2">
                {answers.map((answer, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onAnswerSelected(answer)}
                            className="w-full text-left px-4 py-2 rounded bg-gray-100 hover:bg-blue-100 transition"
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionboxMultipleChoice;
