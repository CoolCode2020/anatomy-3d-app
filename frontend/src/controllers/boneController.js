
/*
This controller Sets the variable boneName to the Name of the clicked bone
*/
export function handleBoneClick(boneName, setSelectedBone, mesh, setSelectedMesh) {
  console.log(`Bone clicked: ${boneName}`)
  console.log('[App] Mesh selected for outline:', mesh)
  console.log('Has UUID:', mesh?.uuid)
  console.log('IsMesh:', mesh?.isMesh)
  setSelectedBone(boneName)
  setSelectedMesh(mesh)
}


