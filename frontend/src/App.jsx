import { useState, useEffect, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useProgress, Circle, Stats } from '@react-three/drei'
import { SkeletonModel } from './components/SkeletonModel'

// Loader UI while GLB is loading
function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)}% loaded</Html>
}

function App() {
  const [count, setCount] = useState(0)
  const [testData, setTestData] = useState(null)
  const [selectedBone, setSelectedBone] = useState(null)


  useEffect(() => {
    async function getTest() {
      try {
        const response = await fetch("http://localhost:8080/api")
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        setTestData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getTest()
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

    {/* Backend Test */}
    <div className="card">
      <h2>Backend Test Data:</h2>
      <pre>{testData ? JSON.stringify(testData, null, 2) : "Loading..."}</pre>
    </div>

    {/* Read Docs */}
    <div className="read-the-docs">
      Click on the Vite and React logos to learn more
    </div>

    {/* Floating UI for selected bone */}
    {selectedBone && (
      <div className="bone-info-panel">
        <h3>Selected Bone:</h3>
        <p>{selectedBone}</p>
      </div>
    )}

    {/* 3D Canvas */}
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        camera={{ position: [0, 2, 4] }}
        shadows
        style={{ background: '#f0f0f0', height: '100vh', width: '100vw' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 10, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Loader />}>
          <SkeletonModel onBoneClick={setSelectedBone} />
          <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="blue" />
          </Circle>
        </Suspense>

        <OrbitControls target={[0, 1, 0]} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </div>
  </>
)
}

export default App