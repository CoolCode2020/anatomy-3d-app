import { useState, useEffect, useRef } from 'react'
import './App.css'

// MVC Imports
import { useBoneModel } from './models/boneModel.js'
import { fetchTestData } from './api/backendService.js'
import { handleBoneClick } from './controllers/boneController.js'
import Navbar from './components/Navbar'; //

// Component Views
import { ViewerCanvas } from './components/ViewerCanvas.jsx'
import { BoneInfoPanel } from './components/BoneInfoPanel.jsx'// Loader UI while GLB is loading

function App() {
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
  <>
    {/* Navbar */}
    <Navbar />

    {/* Backend Test */}
    <div className="card">
      <h2>Backend Test Data:</h2>
      <pre>{testData ? JSON.stringify(testData, null, 2) : "Loading..."}</pre>
    </div>


    {/* Bone Info Panel */}
    <BoneInfoPanel
      selectedBone={selectedBone}
      sceneRef={sceneRef}
      setSelectedBone={setSelectedBone}
      setSelectedMesh={setSelectedMesh}
    />

    {/* 3D Canvas View */}
    <ViewerCanvas
      onBoneClick={(name, mesh) =>
        handleBoneClick(name, setSelectedBone, mesh, setSelectedMesh)
      }
      selectedMesh={selectedMesh}
      sceneRef={sceneRef}
      setSelectedBone={setSelectedBone}
      setSelectedMesh={setSelectedMesh}
      
    />
  </>
)}

export default App
