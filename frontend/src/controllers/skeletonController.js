import { handleBoneClick } from './boneController'

/**
 * Sets up 3D Scene for Skeleton
 * @param {*} scene 
 * @param {*} onBoneClick 
 */

export function setupSkeletonScene(scene, onBoneClick) {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.userData.name = child.name

      console.log('[SkeletonController] Mesh added:', child.name)
    }
  })
}

