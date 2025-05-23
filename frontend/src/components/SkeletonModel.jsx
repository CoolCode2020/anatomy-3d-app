import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export function SkeletonModel() {
  const { scene } = useGLTF('http://localhost:8080/models/Skelett.glb')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} position={[0, 1, 0]} />
}