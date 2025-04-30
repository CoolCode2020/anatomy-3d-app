import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//3D stuff 
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SkeletonModel } from './components/SkeletonModel'



function App() {
  const [count, setCount] = useState(0);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    async function getTest() {
      try {
        const response = await fetch("http://localhost:8080/api");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // You should see your test JSON here
        setTestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getTest(); // 👈 Call the function
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <h2>Backend Test Data:</h2>
        <pre>{testData ? JSON.stringify(testData, null, 2) : "Loading..."}</pre>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight />
        <directionalLight position={[0, 10, 5]} intensity={1.2} />
        <SkeletonModel />
        <OrbitControls />
      </Canvas>
    </div>
    </>
    
  )
}

export default App
