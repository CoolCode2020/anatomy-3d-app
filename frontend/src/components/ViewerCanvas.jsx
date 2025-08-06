import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import { SkeletonModel } from './SkeletonModel';
import PropTypes from 'prop-types';
import { EffectComposer, Outline } from '@react-three/postprocessing';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.floor(progress)}% geladen</Html>;
}

export function ViewerCanvas({ onBoneClick, selectedMesh, sceneRef, setSelectedBone, setSelectedMesh }) {
  return (
      <div
          style={{
            height: '100%',
            width: '100%',
            background: '#ffffff',
          }}
      >
        <Canvas
            camera={{ position: [0, 1.6, 3.2], fov: 35 }}
            shadows
            onPointerMissed={() => {
              setSelectedBone(null);
              setSelectedMesh(null);
            }}
        >
          {/* Licht */}
          <ambientLight intensity={0.5} color="#fff8e1" />
          <directionalLight
              position={[5, 10, 5]}
              intensity={1.2}
              castShadow
              color="#ffffff"
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0005}
          />

          <Suspense fallback={<Loader />}>
            {/* Boden */}
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color="#cfd8e3" />
            </mesh>

            {/* Rückwand */}
            <mesh position={[0, 2.5, -5]}>
              <planeGeometry args={[10, 5]} />
              <meshStandardMaterial color="#80b3ff" />
            </mesh>

            {/* Vorderwand */}
            <mesh rotation-y={Math.PI} position={[0, 2.5, 5]}>
              <planeGeometry args={[10, 5]} />
              <meshStandardMaterial color="#80b3ff" />
            </mesh>

            {/* Linke Wand */}
            <mesh rotation-y={Math.PI / 2} position={[-5, 2.5, 0]}>
              <planeGeometry args={[10, 5]} />
              <meshStandardMaterial color="#80b3ff" />
            </mesh>

            {/* Rechte Wand */}
            <mesh rotation-y={-Math.PI / 2} position={[5, 2.5, 0]}>
              <planeGeometry args={[10, 5]} />
              <meshStandardMaterial color="#80b3ff" />
            </mesh>

            {/* Decke */}
            <mesh rotation-x={Math.PI / 2} position={[0, 5, 0]}>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color="#5c85d6" />
            </mesh>

            {/* Skelett */}
            <SkeletonModel onBoneClick={onBoneClick} sceneRef={sceneRef} />
          </Suspense>

          <OrbitControls
              target={[0, 1, 0]}
              minDistance={2}
              maxDistance={4}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.1}
          />

          <EffectComposer multisampling={8} autoClear={false}>
            {selectedMesh && (
                <Outline
                    selection={[selectedMesh]}
                    visibleEdgeColor="#FAD643"
                    edgeStrength={10}
                    width={500}
                    pulseSpeed={1}
                    blur
                    xRay
                />
            )}
          </EffectComposer>
        </Canvas>
      </div>
  );
}

ViewerCanvas.propTypes = {
  onBoneClick: PropTypes.func.isRequired,
  selectedMesh: PropTypes.object,
  sceneRef: PropTypes.object.isRequired,
  setSelectedBone: PropTypes.func.isRequired,
  setSelectedMesh: PropTypes.func.isRequired,
};
