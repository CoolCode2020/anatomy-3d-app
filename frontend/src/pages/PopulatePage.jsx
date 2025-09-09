import { useRef } from 'react';
import { ViewerCanvas } from '../components/ViewerCanvas';

export default function PopulatePage() {
  const sceneRef = useRef();

  const populate = async () => {
    const root = sceneRef.current?.scene || sceneRef.current;
    if (!root) return alert("Scene not ready yet.");

    const bones = [];
    root.traverse((child) => {
      if (child.isMesh && child.name) {
        bones.push(child.name);
      }
    });

    try {
      const res = await fetch('http://localhost:8080/bones/populate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bones })
      });
      const data = await res.json();
      alert(`Inserted ${data.inserted} bones into DB`);
    } catch (e) {
      console.error(e);
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <button
        onClick={populate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Populate Database
      </button>
      <div className="h-[70vh] border">
        <ViewerCanvas
          onBoneClick={() => {}}
          selectedMesh={null}
          sceneRef={sceneRef}
          setSelectedBone={() => {}}
          setSelectedMesh={() => {}}
        />
      </div>
    </div>
  );
}