import { useRef } from 'react';
import { useBoneModel } from '../models/boneModel.js';
import { handleBoneClick } from '../controllers/boneController.js';
import { ViewerCanvas } from '../components/ViewerCanvas.jsx';
import QuestionboxMultipleChoice from '../components/QuestionboxMultipleChoice.jsx';
import { useQuiz } from '../hooks/useQuiz';

export default function Quiz1() {
    const sceneRef = useRef();

    const {
        setSelectedBone,
        selectedMesh,
        setSelectedMesh
    } = useBoneModel();
    const {
    options,
    correctBone,
    selectedAnswer,
    isLoading,
    error,
    answer,
  } = useQuiz();
  if (isLoading) return <div>Lade...</div>;
  if (error) return <div>Fehler: {error.message}</div>;

    
    return (
        <div className="flex h-[calc(100vh-6rem)]">
            {/* Linke Spalte: Vertikal zentrierte QuestionboxMultipleChoice */}
            <div className="w-1/3 p-4 bg-white flex items-center justify-center">
                <div className="w-full max-w-md">
                    <QuestionboxMultipleChoice
                        question="Welcher Knochen leuchtet?"
                        answers={options}
                        onAnswerSelected={answer}
                        selectedAnswer={selectedAnswer}
                        correctAnswer={correctBone}
                    />
                </div>
            </div>

            {/* Rechte Spalte: 3D-Canvas */}
            <div className="w-2/3 h-full">
                <ViewerCanvas
                    onBoneClick={(name, mesh) =>
                        handleBoneClick(name, setSelectedBone, mesh, setSelectedMesh)
                    }
                    selectedMesh={selectedMesh}
                    sceneRef={sceneRef}
                    setSelectedBone={setSelectedBone}
                    setSelectedMesh={setSelectedMesh}
                />
            </div>
        </div>
    );
}
