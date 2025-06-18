import { useRef } from 'react';
import { useBoneModel } from '../models/boneModel';
import { handleBoneClick } from '../controllers/boneController';
import { ViewerCanvas } from '../components/ViewerCanvas';
import QuestionBox from '../components/QuestionBox';

export default function Quiz2Page() {
    const sceneRef = useRef();

    const {
        selectedBone,
        setSelectedBone,
        selectedMesh,
        setSelectedMesh
    } = useBoneModel();

    return (
        <div className="flex h-[calc(100vh-6rem)]">
            <div className="w-1/3 p-4 bg-white flex items-center justify-center">
                <div className="w-full max-w-md">
                    <QuestionBox question="Klicke den Oberschenkelknochen an." />
                </div>
            </div>

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
