import { useState, useEffect, Suspensem, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// MVC Imports
import { useBoneModel } from './models/boneModel.js'
import { fetchTestData } from './api/backendService.js'
import { handleBoneClick } from './controllers/boneController.js'
import Navbar from './components/Navbar'; //

// Component Views
import { ViewerCanvas } from './components/ViewerCanvas.jsx'
import { BoneInfoPanel } from './components/BoneInfoPanel.jsx'// Loader UI while GLB is loading

function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)}% loaded</Html>
}

function App() {
  const [count, setCount] = useState(0)
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

    <div className="read-the-docs">
      Click on the Vite and React logos to learn more
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
    />
  </>
)}

export default App
