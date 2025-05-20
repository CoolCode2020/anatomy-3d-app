import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export function SkeletonModel() {
  const { scene } = useGLTF('http://localhost:8080/models/skeleton.gltf')

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material.color = new THREE.Color('#f5f5dc') // Optional: bone tint
        child.material.roughness = 0.9
        child.material.metalness = 0.1
      }
    })
  }, [scene])

  return <primitive object={scene} position={[0, 1, 0]} />
}