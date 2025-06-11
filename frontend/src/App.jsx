// /src/App.jsx
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// MVC Imports
import { useBoneModel } from './models/boneModel.js'
import { fetchTestData } from './api/backendService.js'
import { handleBoneClick } from './controllers/boneController.js'
import { BoneInfoPanel } from './components/BoneInfoPanel.jsx'

// Component Views
import { ViewerCanvas } from './components/ViewerCanvas.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [testData, setTestData] = useState(null)

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
      {/* Logos */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Header */}
      <h1>Vite + React</h1>

      {/* Counter */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <div className="bg-yellow-200 text-center p-8 rounded">
        ✅ Tailwind is working!
      </div>

      {/* Backend Test */}
      <div className="card">
        <h2>Backend Test Data:</h2>
        <pre>{testData ? JSON.stringify(testData, null, 2) : "Loading..."}</pre>
      </div>

      {/* Docs Message */}
      <div className="read-the-docs">
        Click on the Vite and React logos to learn more
      </div>
      {/* Bone Info Canvas View */}
      <BoneInfoPanel boneName={selectedBone} />
      {/* 3D Canvas View */}
      <ViewerCanvas onBoneClick={(bone) => handleBoneClick(bone, setSelectedBone)} />
    </>
  )
}

export default App
