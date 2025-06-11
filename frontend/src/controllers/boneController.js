
/*
This controller Sets the variable boneName to the Name of the clicked bone
*/
export function handleBoneClick(boneName, setSelectedBone) {
 console.log(`Bone clicked: ${boneName}`)

  setSelectedBone(boneName)
}

