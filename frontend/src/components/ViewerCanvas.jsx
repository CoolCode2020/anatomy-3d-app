import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useProgress, Circle, Stats } from '@react-three/drei'
import { SkeletonModel } from './SkeletonModel'
import PropTypes from 'prop-types'


function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)}% loaded</Html>
}

export function ViewerCanvas({ onBoneClick }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        camera={{ position: [0, 2, 4] }}
        shadows
        style={{ background: '#f0f0f0', height: '100vh', width: '100vw' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 10, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Loader />}>
          <SkeletonModel onBoneClick={onBoneClick} />
          <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="blue" />
          </Circle>
        </Suspense>

        <OrbitControls target={[0, 1, 0]} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </div>
  )
}

ViewerCanvas.propTypes = {
  onBoneClick: PropTypes.func.isRequired
}
