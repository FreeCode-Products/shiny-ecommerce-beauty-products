"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** A single rounded soap bar with a soft, soapy sheen. */
function SoapBar({
  color,
  position,
  rotation,
  scale = 1,
  floatSpeed = 1.4,
}: {
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floatSpeed?: number;
}) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.6} floatIntensity={0.9}>
      <RoundedBox
        args={[2.3, 0.85, 1.45]}
        radius={0.32}
        smoothness={8}
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.35}
          transmission={0.18}
          thickness={1.2}
          ior={1.35}
          envMapIntensity={1.1}
        />
      </RoundedBox>
    </Float>
  );
}

/** Translucent floating bubble. */
function Bubble({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.4}
          roughness={0}
          ior={1.25}
          transparent
          opacity={0.85}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
}

/** Rotates the whole arrangement gently toward the pointer. */
function PointerGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.5;
    const targetX = -state.pointer.y * 0.3;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}

export default function SoapScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#c1714e" />

      <PointerGroup>
        <SoapBar color="#c1714e" position={[0, 0, 0]} rotation={[0.1, -0.3, 0.05]} scale={1.15} />
        <SoapBar
          color="#9a86c4"
          position={[-2.6, 1.1, -1.5]}
          rotation={[0.3, 0.4, -0.2]}
          scale={0.7}
          floatSpeed={1.8}
        />
        <SoapBar
          color="#69b59a"
          position={[2.7, -1.2, -1.2]}
          rotation={[-0.2, 0.2, 0.3]}
          scale={0.62}
          floatSpeed={1.1}
        />
        <Bubble position={[2, 1.6, 0.5]} scale={0.7} />
        <Bubble position={[-2.2, -1.4, 0.8]} scale={0.5} />
        <Bubble position={[1.2, -1.8, 1]} scale={0.4} />
        <Bubble position={[-1.4, 1.9, -0.5]} scale={0.55} />
      </PointerGroup>

      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.35}
        scale={12}
        blur={2.6}
        far={4.5}
        color="#1f1a14"
      />

      {/* Procedural studio environment — no external HDR download needed */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2}
          position={[0, 4, 2]}
          scale={[8, 4, 1]}
          color="#fff6e8"
        />
        <Lightformer
          intensity={1.2}
          position={[-4, 0, 3]}
          scale={[4, 6, 1]}
          color="#ffe7cc"
        />
        <Lightformer
          intensity={1}
          position={[4, -1, 2]}
          scale={[4, 6, 1]}
          color="#e8f0e4"
        />
      </Environment>
    </Canvas>
  );
}
