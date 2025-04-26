'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, Text, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import '@fontsource/inter/700.css'; // Import Inter Bold font

// Aurora logo triangle with glow effect
const AuroraTriangle = ({ position = [0, 0, 0], scale = 1, color = '#3B82F6' }: { position?: [number, number, number], scale?: number, color?: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(time * 0.3) * 0.1;
      mesh.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.z = Math.sin(time * 0.4) * -0.15;
    }
  });

  // Create triangle shape
  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(0, 1 * scale);
  triangleShape.lineTo(-0.85 * scale, -0.7 * scale);
  triangleShape.lineTo(0.85 * scale, -0.7 * scale);
  triangleShape.lineTo(0, 1 * scale);

  const innerTriangleShape = new THREE.Shape();
  innerTriangleShape.moveTo(0, 0.7 * scale);
  innerTriangleShape.lineTo(-0.6 * scale, -0.5 * scale);
  innerTriangleShape.lineTo(0.6 * scale, -0.5 * scale);
  innerTriangleShape.lineTo(0, 0.7 * scale);

  const extrudeSettings = {
    steps: 1,
    depth: 0.1 * scale,
    bevelEnabled: true,
    bevelThickness: 0.01 * scale,
    bevelSize: 0.02 * scale,
    bevelSegments: 3
  };

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <extrudeGeometry args={[triangleShape, extrudeSettings]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh ref={innerMesh} position={[0, 0, 0.06 * scale]}>
        <extrudeGeometry args={[innerTriangleShape, { ...extrudeSettings, depth: 0.05 * scale }]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.7}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Aurora wave effect
const AuroraWave = ({ position = [0, 0, 0], color = '#3B82F6', width = 4 }: { position?: [number, number, number], color?: string, width?: number }) => {
  const points = useRef<THREE.LineSegments>(null);
  const linePoints = [];
  const segments = 20;
  
  for (let i = 0; i <= segments; i++) {
    linePoints.push(new THREE.Vector3((i / segments) * width - width/2, 0, 0));
  }
  
  const curve = new THREE.CatmullRomCurve3(linePoints);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));
  
  useFrame(({ clock }) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const phase = time * 2 + x * 2;
        const y = Math.sin(phase) * 0.2;
        positions.setY(i, y);
      }
      
      positions.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      <lineSegments ref={points}>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial 
          attach="material" 
          color={color} 
          linewidth={3} 
        />
      </lineSegments>
    </group>
  );
};

// Enhanced Aurora logo
const ModernAuroraLogo = () => {
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.2} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <group>
        <AuroraTriangle position={[0, 0.5, 0]} scale={1.2} color="#3B82F6" />
        <AuroraWave position={[0, -0.8, 0]} width={4} color="#3B82F6" />
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhiI2B.woff2"
        >
          AURORA
        </Text>
      </group>
    </Float>
  );
};

// Main ThreeScene component
const ThreeScene: React.FC = () => {
  return (
    <div className="w-full h-[70vh]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[0, 3, 5]} intensity={0.5} color="#3B82F6" />
        
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          speed={1.5}
          zoom={1.2}
          snap
        >
          <ModernAuroraLogo />
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThreeScene; 