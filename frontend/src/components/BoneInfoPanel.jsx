export function BoneInfoPanel({ boneName }) {
  if (!boneName) return null

  return (
    <div className="fixed top-4 left-4 bg-white border rounded shadow p-4 z-50">
      <h3 className="text-lg font-bold">Selected Bone:</h3>
      <p className="text-gray-800">{boneName}</p>
    </div>
  )
}
