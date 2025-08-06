import React from 'react';
import { motion } from 'framer-motion';

const QuestionboxMultipleChoice = ({ question, answers, onAnswerSelected }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto border border-gray-200 break-words overflow-hidden"
        >
            <h2 className="text-lg font-semibold mb-4 break-words">{question}</h2>
            <ul className="space-y-2">
                {answers.map((answer, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onAnswerSelected(answer)}
                            className="w-full text-left px-4 py-2 rounded bg-gray-100 hover:bg-blue-100 transition break-words"
                        >
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default QuestionboxMultipleChoice;
