import { useGLTF } from '@react-three/drei'

export function SkeletonModel() {
  const { scene } = useGLTF('http://localhost:8080/models/Skelet.glb')  // Public-Ordner wird direkt referenziert von vite
  return <primitive object={scene} />
}