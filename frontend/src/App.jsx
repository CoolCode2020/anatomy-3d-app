import { useState, useEffect, Suspense } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, Circle, Stats } from '@react-three/drei';
import { SkeletonModel } from './components/SkeletonModel';
import Navbar from './components/Navbar'; // Du hast das im Code vergessen

// Loader UI while GLB is loading
function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.floor(progress)}% loaded</Html>;
}

function App() {
  const [count, setCount] = useState(0);
  const [testData, setTestData] = useState(null);
  const [selectedBone, setSelectedBone] = useState(null);  // ausgewählter Knochen
  const [selectedMesh, setSelectedMesh] = useState(null);  // ausgewähltes Mesh für Highlight

  useEffect(() => {
    async function getTest() {
      try {
        const response = await fetch("http://localhost:8080/api");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getTest();
  }, []);

  return (
      <>
        {/* Haupt-Container */}
        <div className='flex flex-col w-full h-screen'>
          {/* Navigation */}
          <Navbar />

          {/* Info-Panel, wenn ein Knochen ausgewählt ist */}
          {selectedBone && (
              <div className="absolute top-20 left-4 bg-white text-black p-4 rounded shadow-lg z-10">
                <h3 className="font-bold mb-1">Ausgewählter Knochen:</h3>
                <p>{selectedBone}</p>
              </div>
          )}

          {/* 3D-Canvas */}
          <div className="flex-1">
            <Canvas
                camera={{ position: [0, 2, 4] }}
                shadows
                style={{ background: '#f0f0f0', height: '100%', width: '100%' }}
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
        </div>
      </>
  );
}

export default App;
