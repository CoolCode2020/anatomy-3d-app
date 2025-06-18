import { useEffect, useRef, useState } from 'react'
import { useBoneModel } from '../models/boneModel'
import { fetchTestData } from '../api/backendService'
import { handleBoneClick } from '../controllers/boneController'
import { ViewerCanvas } from '../components/ViewerCanvas'

export default function HomePage() {
    const [testData, setTestData] = useState(null)
    const sceneRef = useRef()

    const {
        selectedBone,
        setSelectedBone,
        selectedMesh,
        setSelectedMesh
    } = useBoneModel()

    useEffect(() => {
        async function loadTestData() {
            try {
                const data = await fetchTestData()
                setTestData(data)
            } catch (error) {
                console.error("Error loading backend data:", error)
            }
        }

        loadTestData()
    }, [])

    return (
        <div className="flex h-[calc(100vh-6rem)]">
            <div className="w-1/3 p-4 overflow-auto bg-white">
                <h2 className="text-lg font-bold mb-2">Backend Test Data:</h2>
                <pre className="text-sm">
          {testData ? JSON.stringify(testData, null, 2) : "Loading..."}
        </pre>
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
    )
}
