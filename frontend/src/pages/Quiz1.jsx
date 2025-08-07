import { useRef } from 'react';
import { useBoneModel } from '../models/boneModel';
import { handleBoneClick } from '../controllers/boneController';
import { ViewerCanvas } from '../components/ViewerCanvas';
import QuestionboxMultipleChoice from '../components/QuestionboxMultipleChoice.jsx';

export default function Quiz1() {
    const sceneRef = useRef();

    const {
        selectedBone,
        setSelectedBone,
        selectedMesh,
        setSelectedMesh
    } = useBoneModel();

    const handleAnswer = (answer) => {
        console.log('Antwort gewählt:', answer);
    };

    return (
        <div className="flex h-[calc(100vh-6rem)]">
            {/* Linke Spalte: Vertikal zentrierte QuestionboxMultipleChoice */}
            <div className="w-1/3 p-4 bg-white flex items-center justify-center">
                <div className="w-full max-w-md">
                    <QuestionboxMultipleChoice
                        question="Wie heißt dieser Knochen?"
                        answers={['Femur', 'Tibia', 'Humerus', 'Ulna']}
                        onAnswerSelected={handleAnswer}
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
