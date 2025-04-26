// @ts-nocheck
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Text, 
  Environment, 
  PresentationControls, 
  ContactShadows,
  MeshDistortMaterial,
  Stars,
  Html,
  Trail,
  RoundedBox,
  Torus,
  MeshWobbleMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import '@fontsource/inter/700.css';
import { Group, Vector3, Color, Matrix4, InstancedMesh, MeshStandardMaterial, ShaderMaterial } from 'three';

// Add custom CSS to ensure canvas takes full height
const canvasStyle = {
  width: '100%',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 5,
  pointerEvents: 'auto',
  backgroundColor: 'transparent'
};

// Prop types for components
interface EnvelopeProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

interface PhoneProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

interface FloatingBlobProps {
  position?: [number, number, number];
  color?: string;
  scale?: number | [number, number, number];
}

interface ConnectionNodesProps {
  count?: number;
  radius?: number;
  lineColor?: string;
}

// Floating particle system
const ParticleSwarm = ({ count = 100 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [transforms] = useState(() => {
    return Array.from({ length: count }, (_, i) => {
      const position = [
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      ];
      const scale = Math.random() * 0.05 + 0.05;
      const speed = Math.random() * 0.2 + 0.1;
      const offset = Math.random() * Math.PI * 2;
      return { position, scale, speed, offset };
    });
  });

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    transforms.forEach((data, i) => {
      const t = clock.getElapsedTime() * data.speed + data.offset;
      const [x, y, z] = data.position as number[];
      
      // Create a swirling motion pattern
      const newX = x + Math.sin(t) * 0.2;
      const newY = y + Math.cos(t * 0.7) * 0.2;
      const newZ = z + Math.sin(t * 0.5) * 0.2;
      
      // Apply transforms to instanced mesh
      const matrix = new THREE.Matrix4();
      matrix.makeScale(data.scale as number, data.scale as number, data.scale as number);
      matrix.setPosition(newX, newY, newZ);
      
      if (mesh.current) {
        mesh.current.setMatrixAt(i, matrix);
      }
    });
    
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count] as any}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.5} />
    </instancedMesh>
  );
};

// Animated Cursor Trail
const MouseTrail = () => {
  const { viewport } = useThree();
  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ mouse }) => {
    // Convert mouse position to world coordinates
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    if (sphereRef.current) {
      sphereRef.current.position.x = x;
      sphereRef.current.position.y = y;
      sphereRef.current.position.z = 0;
    }
  });
  
  return (
    <group>
      <Trail
        width={1}
        length={8}
        color="#4f46e5"
        attenuation={(t: number) => t * t}
      >
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#4f46e5" />
        </mesh>
      </Trail>
    </group>
  );
};

// 3D envelope model
const Envelope: React.FC<EnvelopeProps> = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const envelopeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Create envelope shape
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (envelopeRef.current) {
      envelopeRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      envelopeRef.current.position.y = Math.sin(time * 0.4) * 0.1;
      
      // Add extra animation when hovered
      if (hovered) {
        envelopeRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
        envelopeRef.current.position.y += 0.01 * Math.sin(time * 2);
      }
      
      // Add open animation when clicked
      if (clicked) {
        envelopeRef.current.rotation.x = THREE.MathUtils.lerp(
          envelopeRef.current.rotation.x,
          Math.PI * 0.1,
          0.1
        );
      } else {
        envelopeRef.current.rotation.x = THREE.MathUtils.lerp(
          envelopeRef.current.rotation.x,
          0,
          0.1
        );
      }
    }
  });

  return (
    <group 
      ref={envelopeRef} 
      position={position} 
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Envelope base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1.4]} />
        <meshStandardMaterial 
          color={hovered ? "#60A5FA" : "#3B82F6"} 
          metalness={0.2} 
          roughness={0.1} 
          emissive={clicked ? "#3B82F6" : "#000000"}
          emissiveIntensity={clicked ? 0.3 : 0}
        />
      </mesh>
      
      {/* Envelope sides */}
      <mesh position={[0, 0.15, 0.7]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 0.05]} />
        <meshStandardMaterial color="#2563EB" metalness={0.2} roughness={0.1} />
      </mesh>
      
      <mesh position={[0, 0.15, -0.7]} rotation={[-Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 0.05]} />
        <meshStandardMaterial color="#2563EB" metalness={0.2} roughness={0.1} />
      </mesh>
      
      <mesh position={[1, 0.15, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.05, 0.6, 1.4]} />
        <meshStandardMaterial color="#1D4ED8" metalness={0.2} roughness={0.1} />
      </mesh>
      
      <mesh position={[-1, 0.15, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.05, 0.6, 1.4]} />
        <meshStandardMaterial color="#1D4ED8" metalness={0.2} roughness={0.1} />
      </mesh>
      
      {/* Message paper */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.8, 0.05, 1.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      
      {/* Paper text */}
      <Text
        position={[0, 0.18, 0]}
        rotation={[0, 0, 0]}
        fontSize={0.15}
        color="#0F172A"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhiI2B.woff2"
        maxWidth={1.5}
      >
        CONTACT US
      </Text>
      
      {/* Interactive tooltip */}
      {hovered && (
        <Html position={[0, 1, 0]} center distanceFactor={10}>
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {clicked ? "Message Opened!" : "Click to Open"}
          </div>
        </Html>
      )}
    </group>
  );
};

// 3D phone model
const Phone: React.FC<PhoneProps> = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const phoneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [ringing, setRinging] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      phoneRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      
      // Add vibration effect when ringing
      if (ringing) {
        phoneRef.current.position.x += Math.sin(time * 30) * 0.002;
        phoneRef.current.position.z += Math.cos(time * 30) * 0.002;
      }
    }
  });

  // Toggle ringing effect when clicked
  const handleClick = () => {
    setRinging(!ringing);
  };
  
  return (
    <group 
      ref={phoneRef} 
      position={position} 
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Phone base */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial 
          color="#1E293B" 
          metalness={0.8} 
          roughness={0.2} 
          emissive={ringing ? "#60A5FA" : "#000000"}
          emissiveIntensity={ringing ? 0.3 : 0}
        />
      </mesh>
      
      {/* Phone screen */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[0.7, 1.5, 0.01]} />
        <meshStandardMaterial 
          color="#1E293B"
          emissive="#60A5FA"
          emissiveIntensity={ringing ? 0.8 : 0.5}
          metalness={0.9}
          roughness={0}
        />
      </mesh>
      
      {/* Phone camera */}
      <mesh position={[0, 0.7, 0.051]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Phone button */}
      <mesh position={[0, -0.6, 0.051]}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#60A5FA" : "#0F172A"} 
          metalness={0.7} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Interactive tooltip */}
      {hovered && (
        <Html position={[0, 1, 0]} center distanceFactor={10}>
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {ringing ? "Incoming Call" : "Click to Ring"}
          </div>
        </Html>
      )}
    </group>
  );
};

// Floating blob with distortion effect
const FloatingBlob: React.FC<FloatingBlobProps> = ({ position = [0, 0, 0], color = "#60A5FA", scale = 1 }) => {
  const blobRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (blobRef.current) {
      blobRef.current.rotation.z = clock.getElapsedTime() * 0.1;
      blobRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      
      // Pulse effect when hovered
      if (hovered && blobRef.current.scale.x < 1.1) {
        blobRef.current.scale.x += 0.001;
        blobRef.current.scale.y += 0.001;
        blobRef.current.scale.z += 0.001;
      } else if (!hovered && blobRef.current.scale.x > 1) {
        blobRef.current.scale.x -= 0.001;
        blobRef.current.scale.y -= 0.001;
        blobRef.current.scale.z -= 0.001;
      }
    }
  });
  
  return (
    <mesh 
      ref={blobRef} 
      position={position} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={hovered ? "#8B5CF6" : color}
        speed={2}
        distort={hovered ? 0.6 : 0.3}
        radius={1}
        metalness={0.2}
        roughness={0.3}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

// Connected nodes effect
const ConnectionNodes: React.FC<ConnectionNodesProps> = ({ count = 6, radius = 3, lineColor = "#60A5FA" }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Vector3[]>([]);
  const lineRef = useRef<THREE.LineSegments>(null);
  
  // Create node positions
  useEffect(() => {
    nodesRef.current = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = (Math.random() - 0.5) * 2;
      nodesRef.current.push(new THREE.Vector3(x, y, z));
    }
  }, [count, radius]);
  
  useFrame(({ clock }) => {
    if (groupRef.current && nodesRef.current.length && lineRef.current) {
      const time = clock.getElapsedTime();
      
      // Update node positions
      nodesRef.current.forEach((node, i) => {
        const theta = (i / count) * Math.PI * 2 + time * 0.1;
        node.x = Math.cos(theta) * radius;
        node.y = Math.sin(theta) * radius;
        node.z = Math.sin(time * 0.2 + i) * 1;
      });
      
      // Update line geometry
      const positions = lineRef.current.geometry.attributes.position;
      let idx = 0;
      
      // Connect each node to every other node
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          positions.setXYZ(idx++, nodesRef.current[i].x, nodesRef.current[i].y, nodesRef.current[i].z);
          positions.setXYZ(idx++, nodesRef.current[j].x, nodesRef.current[j].y, nodesRef.current[j].z);
        }
      }
      
      positions.needsUpdate = true;
      
      // Rotate the entire group slowly
      groupRef.current.rotation.y = time * 0.05;
    }
  });
  
  // Create line geometry with enough vertices for all connections
  const connectionCount = (count * (count - 1)) / 2;
  const connectionPoints = new Array(connectionCount * 2).fill(0).map(() => new THREE.Vector3());
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(connectionPoints);
  
  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#60A5FA" emissive="#60A5FA" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Lines connecting nodes */}
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={lineColor} transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
};

// Interactive Chat Bubble Component
const ChatBubble = ({ position = [0, 1, 0], text = "Get in touch!" }: { position?: [number, number, number], text?: string }) => {
  const bubbleRef = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Hello! 👋",
    "Have questions?",
    "Contact us today!",
    "We're here to help"
  ];
  
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [active, currentMessage, messages.length]);
  
  useFrame((state) => {
    if (bubbleRef.current) {
      const time = state.clock.getElapsedTime();
      bubbleRef.current.position.y = position[1] + Math.sin(time) * 0.1;
      
      if (active) {
        bubbleRef.current.scale.x = THREE.MathUtils.lerp(bubbleRef.current.scale.x, 1.2, 0.1);
        bubbleRef.current.scale.y = THREE.MathUtils.lerp(bubbleRef.current.scale.y, 1.2, 0.1);
        bubbleRef.current.scale.z = THREE.MathUtils.lerp(bubbleRef.current.scale.z, 1.2, 0.1);
      } else {
        bubbleRef.current.scale.x = THREE.MathUtils.lerp(bubbleRef.current.scale.x, 1, 0.1);
        bubbleRef.current.scale.y = THREE.MathUtils.lerp(bubbleRef.current.scale.y, 1, 0.1);
        bubbleRef.current.scale.z = THREE.MathUtils.lerp(bubbleRef.current.scale.z, 1, 0.1);
      }
    }
  });
  
  return (
    <group 
      ref={bubbleRef} 
      position={position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      {/* Chat bubble background */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.1]} />
        <meshStandardMaterial color={active ? "#4f46e5" : "#6366f1"} metalness={0.3} roughness={0.2} />
      </mesh>
      
      {/* Chat bubble pointer */}
      <mesh position={[-0.5, -0.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.1]} />
        <meshStandardMaterial color={active ? "#4f46e5" : "#6366f1"} metalness={0.3} roughness={0.2} />
      </mesh>
      
      {/* Text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.15}
        color="white"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhiI2B.woff2"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {active ? text : "Click Me!"}
      </Text>
    </group>
  );
};

// Contact Icon Component
interface ContactIconProps {
  position?: [number, number, number];
  icon: string;
  text: string;
  scale?: number;
}

const ContactIcon: React.FC<ContactIconProps> = ({ position = [0, 0, 0], icon, text, scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    groupRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.002;
  });
  
  const iconScale = useMemo(() => hovered ? 1.2 : 1, [hovered]);
  
  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <group scale={iconScale * scale}>
        <Text
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
          font="/fonts/Inter-Bold.woff"
        >
          {icon}
        </Text>
        <Text
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.5, 0]}
          font="/fonts/Inter-Bold.woff"
        >
          {text}
        </Text>
      </group>
    </group>
  );
};

// 3D geometric shapes that float and react to user interaction
const FloatingGeometry = ({ position = [0, 0, 0], color = "#4f46e5", scale = 1, shape = "cube" }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
      
      // Add hover effect
      if (hovered) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale * 1.2, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale * 1.2, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, scale * 1.2, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, scale, 0.1);
      }
      
      // Add click animation
      if (clicked) {
        meshRef.current.rotation.z = t * 2;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        {shape === "cube" && <boxGeometry args={[1, 1, 1]} />}
        {shape === "sphere" && <sphereGeometry args={[0.7, 32, 32]} />}
        {shape === "torus" && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
        {shape === "octahedron" && <octahedronGeometry args={[0.8, 0]} />}
        
        <MeshWobbleMaterial 
          color={hovered ? "#8B5CF6" : color} 
          factor={clicked ? 1 : 0.4} 
          speed={clicked ? 5 : 1}
          metalness={0.2}
          roughness={0.1}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
    </group>
  );
};

// Floating neon ring with particles
const NeonRing = ({ position = [0, 0, 0], radius = 3, color = "#4f46e5", particleCount = 30 }) => {
  const particlesRef = useRef();
  const ringRef = useRef();
  
  // Create particle positions along the ring
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ],
        size: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.01 + 0.005,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, [particleCount, radius]);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate ring
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.1;
    }
    
    // Animate particles along the ring
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          const angle = (i / particleCount) * Math.PI * 2 + t * particle.speed + particle.offset;
          mesh.position.x = Math.cos(angle) * (radius + Math.sin(t + particle.offset) * 0.2);
          mesh.position.y = Math.sin(angle) * (radius + Math.sin(t + particle.offset) * 0.2);
          mesh.scale.setScalar(particle.size + Math.sin(t * 2 + particle.offset) * 0.02);
        }
      });
    }
  });
  
  return (
    <group position={position}>
      {/* Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Particles */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Futuristic platform
const Platform = ({ position = [0, -2, 0], scale = 1, color = "#1e293b" }) => {
  const platformRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (platformRef.current) {
      // Subtle floating animation
      platformRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.05;
    }
  });
  
  return (
    <group ref={platformRef} position={position}>
      <RoundedBox args={[6 * scale, 0.2 * scale, 6 * scale]} radius={0.2} smoothness={4}>
        <meshStandardMaterial 
          color={color} 
          metalness={0.5}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Add decorative elements to the platform */}
      <group position={[0, 0.1, 0]}>
        <Torus args={[2 * scale, 0.05 * scale, 16, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#60A5FA" 
            emissive="#60A5FA"
            emissiveIntensity={0.5}
          />
        </Torus>
      </group>
      
      {/* Add grid lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <planeGeometry args={[5.5 * scale, 5.5 * scale, 10, 10]} />
        <meshBasicMaterial 
          color="#4f46e5" 
          wireframe 
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Main component updates
const ContactThreeDScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div style={canvasStyle}>
      <Canvas 
        className="threejs" 
        shadows 
        dpr={[1, 2]} 
        linear
        flat={false}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <color attach="background" args={['#070C22']} />
        
        {/* Scene lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1.0} castShadow />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[5, 5, 5]} intensity={0.8} angle={0.3} penumbra={1} castShadow />
        
        {/* Scene controls */}
        <PresentationControls
          global
          rotation={[0.1, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <group position={[0, 0, 0]}>
            {/* Main platform with objects */}
            <Platform position={[0, -2, 0]} scale={1.2} />
            
            {/* Main envelope model with hover effects */}
            <Float floatIntensity={0.5} speed={2} rotationIntensity={0.5}>
              <Envelope position={[0, 0, 0]} scale={1} />
            </Float>
            
            {/* Phone model with hover animation */}
            <Float floatIntensity={0.3} speed={1.5} rotationIntensity={0.2}>
              <Phone position={[-2, -0.5, -1]} scale={0.8} rotation={[0, Math.PI / 6, 0]} />
            </Float>
            
            {/* Add chat bubble UI element */}
            <ChatBubble position={[2, 1, 0]} text="Contact us now!" />
            
            {/* Floating geometric shapes */}
            <Float floatIntensity={0.5} speed={1.5}>
              <FloatingGeometry position={[2.5, -1, 0]} color="#60A5FA" shape="sphere" scale={0.5} />
            </Float>
            
            <Float floatIntensity={0.3} speed={1.3} rotationIntensity={0.6}>
              <FloatingGeometry position={[-2.5, 1.5, -1]} color="#8B5CF6" shape="cube" scale={0.4} />
            </Float>
            
            <Float floatIntensity={0.2} speed={2} rotationIntensity={0.4}>
              <FloatingGeometry position={[1.5, 2, -1]} color="#F472B6" shape="torus" scale={0.4} />
            </Float>
            
            <Float floatIntensity={0.4} speed={1.8} rotationIntensity={0.3}>
              <FloatingGeometry position={[-2, 0, 1]} color="#34D399" shape="octahedron" scale={0.5} />
            </Float>
            
            {/* Neon ring surrounding the scene */}
            <NeonRing position={[0, 0, -3]} radius={4} color="#4f46e5" particleCount={40} />
            
            {/* Floating blobs with distortion */}
            <FloatingBlob position={[3, 1, -2]} color="#60A5FA" scale={0.8} />
            <FloatingBlob position={[-3, -1, -2]} color="#8B5CF6" scale={0.6} />
            
            {/* Add contact icons */}
            <ContactIcon position={[-3, 2, 0]} icon="📞" text="Call" scale={0.6} />
            <ContactIcon position={[3, 2, 0]} icon="📱" text="Message" scale={0.6} />
            <ContactIcon position={[0, 2.5, 0]} icon="📧" text="Email" scale={0.6} />
          </group>
        </PresentationControls>
        
        {/* Environment and effects */}
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        <Environment preset="city" />
        
        {/* Mouse trail effect (only on desktop) */}
        {!isMobile && <MouseTrail />}
        
        {/* Particle system in background */}
        <ParticleSwarm count={150} />
      </Canvas>
      
      {/* Debug overlay to help locate the 3D canvas */}
      <div className="debug-3d-layer">3D Scene Active</div>
    </div>
  );
};

export default ContactThreeDScene; 