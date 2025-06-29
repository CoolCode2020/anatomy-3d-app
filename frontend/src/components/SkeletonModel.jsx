import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { setupSkeletonScene } from '../controllers/skeletonController'

export function SkeletonModel({ onBoneClick, sceneRef }) {
  const { scene } = useGLTF('http://localhost:8080/models/Skelett.glb')
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current) {
      setupSkeletonScene(scene, onBoneClick)

      if (sceneRef) {
        sceneRef.current = scene //Übergabe für externes Traversing (z. B. BoneSearch)
      }

      initializedRef.current = true
    }
  }, [scene, onBoneClick, sceneRef])

  return (
    <primitive
      object={scene}
      position={[0, 1, 0]}
      onPointerDown={(e) => {
        e.stopPropagation()
        console.log('[SkeletonModel] Pointer down on:', e.object.name)
        if (onBoneClick && e.object?.name) {
          onBoneClick(e.object.name, e.object)
        }
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    />
  )
}
