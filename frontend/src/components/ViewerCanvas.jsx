import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useProgress, Circle, Stats } from '@react-three/drei'
import { SkeletonModel } from './SkeletonModel'
import PropTypes from 'prop-types'
import { EffectComposer, Outline, Bloom } from '@react-three/postprocessing'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)}% loaded</Html>
}

export function ViewerCanvas({ onBoneClick, selectedMesh, sceneRef, setSelectedBone, setSelectedMesh }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        camera={{ position: [0, 2, 4] }}
        shadows
        style={{ background: '#f0f0f0', height: '100vh', width: '100vw' }}
        onPointerMissed={() => {
          setSelectedBone(null)
          setSelectedMesh(null)
          console.log('[ViewerCanvas] Clicked empty space → selection cleared')
        }}
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
          <SkeletonModel onBoneClick={onBoneClick} sceneRef={sceneRef} />
          <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial color="blue" />
          </Circle>
        </Suspense>

        <OrbitControls target={[0, 1, 0]} />
        <axesHelper args={[5]} />
        <Stats />

        {/* 🧠 Highlighting EffectComposer */}
        <EffectComposer multisampling={8} autoClear={false}>
          {selectedMesh && (
            <Outline
              selection={[selectedMesh]}
              visibleEdgeColor="#FAD643"
              edgeStrength={10}
              width={500}
              pulseSpeed={1}
              blur={true}
              xRay={true}
            />
          )}         
        </EffectComposer>
      </Canvas>
    </div>
  )
}

ViewerCanvas.propTypes = {
  onBoneClick: PropTypes.func.isRequired,
  selectedMesh: PropTypes.object, // 🆕 for Outline effect
  sceneRef: PropTypes.object.isRequired,
  setSelectedBone: PropTypes.func.isRequired,
  setSelectedMesh: PropTypes.func.isRequired
}
