import PropTypes from 'prop-types'

export default function PopulateButton({ boneList }) {
  const handlePopulate = async () => {
    try {
      const response = await fetch('http://localhost:8080/bones/populate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bones: boneList })
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log('[PopulateButton]  Server response:', result)
    } catch (err) {
      console.error('[PopulateButton]  Error:', err.message)
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={handlePopulate}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        disabled={boneList.length === 0}
      >
         Populate Bone Database
      </button>
    </div>
  )
}

PopulateButton.propTypes = {
  boneList: PropTypes.array.isRequired
}