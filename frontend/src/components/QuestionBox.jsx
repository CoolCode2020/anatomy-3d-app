import React from 'react';
import { motion } from 'framer-motion';

const QuestionPrompt = ({ question }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            className="bg-white shadow-xl rounded-2xl px-8 py-6 border border-gray-200 max-w-xl w-full overflow-hidden break-words"
        >
            <h2 className="text-lg font-semibold break-words">{question}</h2>
        </motion.div>
    );
};

export default QuestionPrompt;
