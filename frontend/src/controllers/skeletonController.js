import { handleBoneClick } from './boneController'

/**
 * Sets up 3D Scene for Skeleton
 * @param {*} scene 
 * @param {*} onBoneClick 
 * @param {*} onBoneNamesExtracted
 */

export function setupSkeletonScene(scene, onBoneClick, onBoneNamesExtracted) {
  const boneNames = []

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.userData.name = child.name

      boneNames.push(child.name)
      console.log('[SkeletonController] Mesh added:', child.name)
    }
  })

  if (onBoneNamesExtracted) {
    onBoneNamesExtracted(boneNames)
  }
}
