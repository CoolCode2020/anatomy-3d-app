import { useGLTF } from '@react-three/drei'

export function SkeletonModel() {
  const { scene } = useGLTF('/Skelet.glb')  // Public-Ordner wird direkt referenziert von vite
  return <primitive object={scene} />
}