"use client";

import { Float, Grid, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const columnConfigs = [
  { x: -2.15, z: 1.2, height: 1.1, color: "#17c89f" },
  { x: -1.25, z: 0.45, height: 1.7, color: "#f2a161" },
  { x: -0.35, z: 1.6, height: 1.35, color: "#7ce5d8" },
  { x: 0.8, z: 1.1, height: 2.05, color: "#17c89f" },
  { x: 1.7, z: 0.3, height: 1.45, color: "#f2a161" },
  { x: 2.4, z: 1.55, height: 0.95, color: "#7ce5d8" },
];

const pillarConfigs = [
  { x: -3.2, z: -1.9, height: 2.9, color: "#7ce5d8" },
  { x: 3.1, z: -2.2, height: 2.5, color: "#f3a66b" },
  { x: 0.15, z: -3.1, height: 3.4, color: "#95edff" },
];

const panelConfigs = [
  {
    position: [2.9, 1.18, -1.45] as [number, number, number],
    rotation: [0.22, -0.42, 0.08] as [number, number, number],
    size: [1.36, 0.82, 0.08] as [number, number, number],
    color: "#0f2432",
    glow: "#95edff",
    speed: 1.4,
  },
  {
    position: [-3.05, -0.2, -1.3] as [number, number, number],
    rotation: [0.18, 0.48, -0.1] as [number, number, number],
    size: [1.48, 0.56, 0.08] as [number, number, number],
    color: "#102733",
    glow: "#7ce5d8",
    speed: 1.15,
  },
  {
    position: [0.32, 2.08, -2.4] as [number, number, number],
    rotation: [0.38, -0.06, 0.06] as [number, number, number],
    size: [1.72, 0.22, 0.06] as [number, number, number],
    color: "#0d1a26",
    glow: "#f3a66b",
    speed: 1.6,
  },
];

const atmosphericRingConfigs = [
  {
    radius: 3.15,
    tube: 0.02,
    rotation: [Math.PI / 2, 0.18, 0.28] as [number, number, number],
    color: "#95edff",
    opacity: 0.24,
  },
  {
    radius: 3.8,
    tube: 0.018,
    rotation: [0.62, 0.72, 0.18] as [number, number, number],
    color: "#7ce5d8",
    opacity: 0.16,
  },
  {
    radius: 4.5,
    tube: 0.024,
    rotation: [0.18, -0.42, 0.5] as [number, number, number],
    color: "#f3a66b",
    opacity: 0.14,
  },
];

const particlePositions = createParticlePositions();

function createParticlePositions() {
  const positions = new Float32Array(320 * 3);

  for (let index = 0; index < 320; index += 1) {
    const radius = 2.4 + Math.random() * 3.8;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 5.4;

    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = height;
    positions[index * 3 + 2] = Math.sin(angle) * radius - Math.random() * 2.4;
  }

  return positions;
}

function CameraRig() {
  useFrame((state) => {
    const driftX = state.pointer.x * 0.42;
    const driftY = 0.18 + state.pointer.y * 0.24 + Math.sin(state.clock.elapsedTime * 0.24) * 0.12;
    const driftZ = 6.75 + Math.cos(state.clock.elapsedTime * 0.22) * 0.16;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, driftX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, driftY, 0.03);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, driftZ, 0.03);
    state.camera.lookAt(0, -0.08, 0);
  });

  return null;
}

function DataColumns() {
  return columnConfigs.map((column) => (
    <group key={`${column.x}-${column.z}`} position={[column.x, -2.15, column.z]}>
      <mesh position={[0, column.height / 2, 0]}>
        <boxGeometry args={[0.2, column.height, 0.2]} />
        <meshStandardMaterial
          color={column.color}
          emissive={column.color}
          emissiveIntensity={1.1}
          roughness={0.14}
          metalness={0.42}
        />
      </mesh>
      <mesh position={[0, column.height + 0.04, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.42]} />
        <meshStandardMaterial
          color="#eef4ef"
          emissive={column.color}
          emissiveIntensity={0.4}
          roughness={0.18}
          metalness={0.28}
        />
      </mesh>
    </group>
  ));
}

function LightPillars() {
  return pillarConfigs.map((pillar) => (
    <group key={`${pillar.x}-${pillar.z}`} position={[pillar.x, -2.15, pillar.z]}>
      <mesh position={[0, pillar.height / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.14, pillar.height, 18, 1, true]} />
        <meshStandardMaterial
          color={pillar.color}
          emissive={pillar.color}
          emissiveIntensity={1.6}
          transparent
          opacity={0.18}
          roughness={0.16}
          metalness={0.18}
        />
      </mesh>
      <mesh position={[0, pillar.height, 0]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshStandardMaterial
          color={pillar.color}
          emissive={pillar.color}
          emissiveIntensity={2.6}
        />
      </mesh>
    </group>
  ));
}

function FloatingPanels() {
  return panelConfigs.map((panel) => (
    <Float
      key={panel.position.join("-")}
      speed={panel.speed}
      rotationIntensity={0.2}
      floatIntensity={0.28}
    >
      <group position={panel.position} rotation={panel.rotation}>
        <mesh>
          <boxGeometry args={panel.size} />
          <meshPhysicalMaterial
            color={panel.color}
            emissive={panel.glow}
            emissiveIntensity={0.18}
            roughness={0.18}
            metalness={0.6}
            transmission={0.14}
            thickness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.14}
          />
        </mesh>

        <mesh position={[-panel.size[0] * 0.16, panel.size[1] * 0.16, panel.size[2] * 0.62]}>
          <boxGeometry args={[panel.size[0] * 0.34, 0.045, 0.012]} />
          <meshStandardMaterial color="#eef4ef" emissive={panel.glow} emissiveIntensity={0.45} />
        </mesh>

        <mesh position={[0, 0, panel.size[2] * 0.62]}>
          <boxGeometry args={[panel.size[0] * 0.62, 0.032, 0.012]} />
          <meshStandardMaterial color="#d8e2df" emissive={panel.glow} emissiveIntensity={0.22} />
        </mesh>

        <mesh position={[panel.size[0] * 0.1, -panel.size[1] * 0.18, panel.size[2] * 0.62]}>
          <boxGeometry args={[panel.size[0] * 0.46, 0.032, 0.012]} />
          <meshStandardMaterial color="#8acdbc" emissive={panel.glow} emissiveIntensity={0.28} />
        </mesh>
      </group>
    </Float>
  ));
}

function AtmosphericRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.z += delta * 0.015;
  });

  return (
    <group ref={groupRef}>
      {atmosphericRingConfigs.map((ring) => (
        <mesh key={`${ring.radius}-${ring.color}`} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, ring.tube, 20, 280]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={0.65}
            transparent
            opacity={ring.opacity}
            roughness={0.22}
            metalness={0.48}
          />
        </mesh>
      ))}

      <mesh position={[0, 0.1, -2.8]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.65, 3.45, 96]} />
        <meshBasicMaterial color="#95edff" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function CommandCluster() {
  const rootRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rootRef.current || !coreRef.current || !orbitRef.current) {
      return;
    }

    rootRef.current.rotation.y += delta * 0.16;
    rootRef.current.rotation.x = THREE.MathUtils.lerp(
      rootRef.current.rotation.x,
      state.pointer.y * 0.16,
      0.04,
    );
    rootRef.current.rotation.z = THREE.MathUtils.lerp(
      rootRef.current.rotation.z,
      -state.pointer.x * 0.16,
      0.04,
    );

    orbitRef.current.rotation.y -= delta * 0.22;
    orbitRef.current.rotation.z += delta * 0.08;

    coreRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.09;
  });

  return (
    <>
      <Grid
        cellColor="#14352c"
        sectionColor="#f2a161"
        position={[0, -2.28, 0]}
        infiniteGrid
        fadeDistance={20}
        fadeStrength={1.9}
        cellSize={0.48}
        sectionSize={2.6}
        cellThickness={0.55}
        sectionThickness={1.2}
      />

      <LightPillars />
      <DataColumns />
      <FloatingPanels />
      <AtmosphericRings />

      <mesh position={[0, 0.05, -3.4]}>
        <sphereGeometry args={[2.75, 32, 32]} />
        <meshBasicMaterial color="#113349" transparent opacity={0.12} />
      </mesh>

      <group ref={rootRef}>
        <Float speed={1.25} rotationIntensity={0.28} floatIntensity={0.38}>
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[1.18, 8]} />
            <meshPhysicalMaterial
              color="#9de9c9"
              emissive="#135745"
              emissiveIntensity={0.82}
              roughness={0.08}
              metalness={0.14}
              clearcoat={1}
              clearcoatRoughness={0.16}
              transmission={0.26}
              thickness={0.9}
            />
          </mesh>
        </Float>

        <group ref={orbitRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.9, 0.03, 24, 220]} />
            <meshStandardMaterial
              color="#f2a161"
              emissive="#f2a161"
              emissiveIntensity={1.7}
              roughness={0.12}
            />
          </mesh>

          <mesh rotation={[0.48, 0.92, 0.22]}>
            <torusGeometry args={[2.42, 0.018, 24, 240]} />
            <meshStandardMaterial
              color="#7ce5d8"
              emissive="#7ce5d8"
              emissiveIntensity={0.94}
              transparent
              opacity={0.82}
              roughness={0.18}
            />
          </mesh>

          <mesh rotation={[0.12, -0.36, 0.68]}>
            <torusGeometry args={[2.84, 0.024, 24, 260]} />
            <meshStandardMaterial
              color="#95edff"
              emissive="#95edff"
              emissiveIntensity={0.86}
              transparent
              opacity={0.4}
              roughness={0.16}
            />
          </mesh>

          {[
            [1.92, 0, 0],
            [-1.26, 1.22, 0.18],
            [0.22, -1.72, 0.88],
            [-0.54, 0.46, -2.2],
          ].map((position, index) => (
            <mesh key={index} position={position as [number, number, number]}>
              <sphereGeometry args={[0.08, 20, 20]} />
              <meshStandardMaterial
                color="#f3c77d"
                emissive="#f3c77d"
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}
        </group>

        <mesh rotation={[0.16, 0.52, 0.1]}>
          <sphereGeometry args={[1.62, 36, 36]} />
          <meshBasicMaterial color="#c6fff3" transparent opacity={0.08} wireframe />
        </mesh>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#fff2cf"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.18, 6.75], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={["#040910", 6.5, 14.5]} />
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#f7f0cd", "#071019", 1.35]} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff0d1" />
      <pointLight position={[-4, -1.5, 3]} intensity={18} color="#7ce5d8" />
      <pointLight position={[3.5, 1.2, -2]} intensity={13} color="#f2a161" />
      <pointLight position={[0, 2.5, -4]} intensity={10} color="#95edff" />
      <CameraRig />
      <CommandCluster />
      <Sparkles
        count={240}
        scale={[9.5, 6.2, 10]}
        size={2.2}
        speed={0.34}
        color="#fff1d1"
      />
    </Canvas>
  );
}