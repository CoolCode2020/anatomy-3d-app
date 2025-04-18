import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




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
    </>
  )
}

export default App
