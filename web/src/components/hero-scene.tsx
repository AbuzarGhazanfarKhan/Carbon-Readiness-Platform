"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const particlePositions = createParticlePositions();

function createParticlePositions() {
  const positions = new Float32Array(240 * 3);

  for (let index = 0; index < 240; index += 1) {
    const radius = 2 + Math.random() * 1.6;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 2.6;

    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = height;
    positions[index * 3 + 2] = Math.sin(angle) * radius;
  }

  return positions;
}

function OrbitalCore() {
  const clusterRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!clusterRef.current || !haloRef.current || !outerRingRef.current) {
      return;
    }

    clusterRef.current.rotation.y += delta * 0.2;
    clusterRef.current.rotation.x = THREE.MathUtils.lerp(
      clusterRef.current.rotation.x,
      state.pointer.y * 0.18,
      0.04,
    );
    clusterRef.current.rotation.z = THREE.MathUtils.lerp(
      clusterRef.current.rotation.z,
      -state.pointer.x * 0.18,
      0.04,
    );

    haloRef.current.rotation.y -= delta * 0.08;
    outerRingRef.current.rotation.z += delta * 0.14;
  });

  return (
    <group ref={clusterRef}>
      <Float speed={1.6} rotationIntensity={0.45} floatIntensity={0.8}>
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <MeshDistortMaterial
            color="#9bd28f"
            roughness={0.12}
            metalness={0.24}
            emissive="#183a2c"
            emissiveIntensity={0.35}
            distort={0.34}
            speed={1.8}
          />
        </mesh>
      </Float>

      <mesh rotation={[1.15, 0.2, 0.3]}>
        <torusGeometry args={[1.92, 0.04, 32, 220]} />
        <meshStandardMaterial
          color="#f1b065"
          emissive="#f1b065"
          emissiveIntensity={1.3}
          roughness={0.16}
        />
      </mesh>

      <mesh ref={outerRingRef} rotation={[0.42, 1.05, 0.2]}>
        <torusGeometry args={[2.45, 0.02, 24, 240]} />
        <meshStandardMaterial
          color="#8ed4cb"
          emissive="#8ed4cb"
          emissiveIntensity={0.7}
          transparent
          opacity={0.7}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[2.75, 48, 48]} />
        <meshBasicMaterial color="#eef7ea" transparent opacity={0.08} wireframe />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#fef5df"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.92}
        />
      </points>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#f9f0cd", "#0e2b23", 1.3]} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#fff0d1" />
      <pointLight position={[-4, -2, 3]} intensity={15} color="#72d6c6" />
      <pointLight position={[3, 1, -2]} intensity={11} color="#efaa64" />
      <OrbitalCore />
      <Sparkles
        count={150}
        scale={[7, 5, 7]}
        size={2.2}
        speed={0.35}
        color="#fff1d2"
      />
    </Canvas>
  );
}