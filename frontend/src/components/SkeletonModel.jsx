import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { setupSkeletonScene } from '../controllers/skeletonController'

export function SkeletonModel({ onBoneClick }) {
  const { scene } = useGLTF('http://localhost:8080/models/Skelett.glb')

  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current) {
      setupSkeletonScene(scene, onBoneClick)
      initializedRef.current = true
    }
  }, [scene, onBoneClick])

  return (
    <primitive
      object={scene}
      position={[0, 1, 0]}
      onPointerDown={(e) => {
    e.stopPropagation()
    console.log('[SkeletonModel] Pointer down on:', e.object.name)
    if (onBoneClick && e.object?.name) {
      onBoneClick(e.object.name)
    }
  }}
    />
  )
}
