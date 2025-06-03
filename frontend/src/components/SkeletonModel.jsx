import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export function SkeletonModel({ onBoneClick, selectedMesh }) {
  const { scene } = useGLTF('http://localhost:8080/models/Skelett.glb')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        child.userData.name = child.name

        // Call onBoneClick from props
        child.onClick = (e) => {
          e.stopPropagation()
          if (onBoneClick) onBoneClick(child.name)
        }
      }
    })
  }, [scene, onBoneClick])

  return (
    <primitive
      object={scene}
      position={[0, 1, 0]}
      onPointerDown={(e) => {
        e.stopPropagation()
        if (onBoneClick && e.object?.name) {
          onBoneClick(e.object.name)
        }
      }}
    />
  )
}