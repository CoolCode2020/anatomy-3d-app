import { motion } from 'framer-motion';

const WelcomeBox = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            className="bg-white shadow-xl rounded-2xl px-8 py-6 border border-gray-200 text-gray-800 max-w-md w-full text-center"
        >
            <h2 className="text-2xl font-semibold mb-4">Willkommen zur Anatomy 3D Lern-App</h2>
            <p className="text-base leading-relaxed">
                Entdecke das menschliche Skelett interaktiv und lerne die wichtigsten Knochen durch
                visuelles Erkunden und spannende Quizfragen kennen.
            </p>
        </motion.div>
    );
};

export default WelcomeBox;
