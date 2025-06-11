import { useState } from 'react'

/*
Custorm React hook to manage the sate of the selcted bone and its mesh
*/


export function useBoneModel() {
  const [selectedBone, setSelectedBone] = useState(null)
  const [selectedMesh, setSelectedMesh] = useState(null)

  return {
    selectedBone,
    setSelectedBone,
    selectedMesh,
    setSelectedMesh,
  }
}

