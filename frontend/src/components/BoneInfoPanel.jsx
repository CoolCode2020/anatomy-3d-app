import { useState } from 'react'

export function BoneInfoPanel({ selectedBone, sceneRef, setSelectedBone, setSelectedMesh }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(false)

  function handleSearch() {
    if (!sceneRef?.current) return

    let found = null
    sceneRef.current.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase() === searchTerm.toLowerCase()) {
        found = child
      }
    })

    if (found) {
      setSelectedBone(found.name)
      setSelectedMesh(found)
      setError(false)
    } else {
      setError(true)
      console.error(`Bone "${searchTerm}" not found.`)
    }
  }

  return (
    <div className="fixed top-4 left-4 bg-white border rounded shadow p-4 z-50 w-[280px]">
      <h3 className="text-lg font-bold mb-2">Selected Bone:</h3>
      <p className="text-gray-800 mb-4">{selectedBone || '—'}</p>

      <input
        type="text"
        placeholder="Search bone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Search Bone
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          Bone "{searchTerm}" not found.
        </p>
      )}
    </div>
  )
}
