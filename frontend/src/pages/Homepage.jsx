import { useRef } from 'react';
import { useBoneModel } from '../models/boneModel';
import { handleBoneClick } from '../controllers/boneController';
import { ViewerCanvas } from '../components/ViewerCanvas';
import WelcomeBox from '../components/WelcomeBox';

export default function HomePage() {
    const sceneRef = useRef();

    const {
        selectedBone,
        setSelectedBone,
        selectedMesh,
        setSelectedMesh
    } = useBoneModel();

    return (
        <div className="flex h-[calc(100vh-6rem)]">
            {/* Linke Spalte: Willkommenstext */}
            <div className="w-1/3 p-4 bg-white flex items-center justify-center">
                <WelcomeBox />
            </div>

            {/* Rechte Spalte: 3D-Modell */}
            <div className="w-2/3 h-30">
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
