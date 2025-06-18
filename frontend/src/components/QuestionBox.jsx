import React from 'react';

const QuestionPrompt = ({ question }) => {
    return (
        <div className="bg-white shadow-xl rounded-2xl px-8 py-6 border border-gray-200 max-w-xl w-full">
            <h2 className="text-lg font-semibold">{question}</h2>
        </div>
    );
};

export default QuestionPrompt;
