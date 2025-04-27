'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PresentationControls, 
  Environment, 
  Text, 
  Float, 
  Html,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';
import '@fontsource/inter/700.css';

// Web design visual representation
const WebDevScene = ({ deviceOrientation }: { deviceOrientation?: { beta: number; gamma: number } }) => {
  // References for animations
  const deviceRef = useRef<THREE.Group>(null);
  const codeRef = useRef<THREE.Mesh>(null);
  const sceneRef = useRef<THREE.Group>(null);
  
  // Animation on each frame
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate device mockup
    if (deviceRef.current) {
      deviceRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }
    
    // Animate code block
    if (codeRef.current) {
      codeRef.current.position.y = Math.sin(t * 0.8) * 0.1 - 1.5;
    }
    
    // Apply device orientation tilt on mobile
    if (sceneRef.current && deviceOrientation) {
      // Convert orientation values to radians and limit the tilt range
      const tiltX = THREE.MathUtils.degToRad(deviceOrientation.beta * 0.1) || 0;
      const tiltZ = THREE.MathUtils.degToRad(deviceOrientation.gamma * 0.1) || 0;
      
      // Apply smooth interpolation to avoid jerky movements
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        tiltX,
        0.05
      );
      
      sceneRef.current.rotation.z = THREE.MathUtils.lerp(
        sceneRef.current.rotation.z,
        tiltZ,
        0.05
      );
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Device mockup */}
      <group ref={deviceRef} position={[0, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.2} />
        </mesh>
        
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.8, 1.8, 0.02]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.1} emissive="#3b82f6" emissiveIntensity={0.1} />
        </mesh>
        
        <group position={[0, 0, 0.1]}>
          <Html transform scale={0.15} position={[0, 0, 0.01]} className="pointer-events-none select-none">
            <div className="w-[400px] h-[240px] bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg p-4 text-white font-bold">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg">Aurora</div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-full h-3 bg-slate-800 rounded-full"></div>
                <div className="w-2/3 h-3 bg-slate-800 rounded-full"></div>
                <div className="w-5/6 h-3 bg-slate-800 rounded-full"></div>
                <div className="mt-4 flex gap-2">
                  <div className="w-20 h-16 bg-indigo-800 rounded-lg"></div>
                  <div className="w-20 h-16 bg-blue-800 rounded-lg"></div>
                  <div className="w-20 h-16 bg-purple-800 rounded-lg"></div>
                </div>
              </div>
            </div>
          </Html>
        </group>
      </group>
      
      {/* Code block */}
      <mesh ref={codeRef} position={[-2, -1.5, 0]}>
        <boxGeometry args={[4, 1.5, 0.1]} />
        <meshStandardMaterial 
          color="#1e293b" 
          metalness={0.8}
          roughness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={0.3}
        />
        
        <Html transform scale={0.15} position={[0, 0, 0.06]} className="pointer-events-none select-none">
          <div className="w-[450px] font-mono text-sm text-blue-300 bg-slate-900 p-3 rounded">
            <div className="opacity-80">
              <span className="text-indigo-400">const</span> <span className="text-green-400">webDesign</span> = () <span className="text-indigo-400">=&gt;</span> {`{`}
              <br />
              &nbsp;&nbsp;<span className="text-indigo-400">return</span> {`{`}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;responsive: <span className="text-orange-400">true</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;modern: <span className="text-orange-400">true</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;performance: <span className="text-purple-400">"excellent"</span>
              <br />
              &nbsp;&nbsp;{`}`}
              <br />
              {`}`}
            </div>
          </div>
        </Html>
      </mesh>
      
      {/* Floating technology indicators */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text position={[2, 1.8, 0]} fontSize={0.35} color="#3b82f6" anchorX="center" anchorY="middle">
          React
        </Text>
      </Float>
      
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
        <Text position={[2.5, 1.2, 0]} fontSize={0.35} color="#8b5cf6" anchorX="center" anchorY="middle">
          NextJS
        </Text>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
        <Text position={[2.3, 0.6, 0]} fontSize={0.35} color="#06b6d4" anchorX="center" anchorY="middle">
          TailwindCSS
        </Text>
      </Float>
      
      {/* Decorative spheres */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[2 + i * 0.5, -1 + i * 0.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"}
            metalness={0.5}
            roughness={0.2}
            emissive={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Background stars */}
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />
    </group>
  );
};

// Main ThreeScene component
const ThreeScene: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState<{ beta: number; gamma: number } | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice);
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);
  
  // Handle device orientation detection for mobile devices
  useEffect(() => {
    if (!isMobile || !isMounted) return;
    
    // Request permission for iOS devices (iOS 13+)
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          setPermissionGranted(permissionState === 'granted');
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
        }
      } else {
        // For non-iOS devices, no permission needed
        setPermissionGranted(true);
      }
    };
    
    requestPermission();
    
    // Handle device orientation events
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        setDeviceOrientation({
          beta: event.beta, // X-axis rotation (front-to-back tilt)
          gamma: event.gamma // Y-axis rotation (left-to-right tilt)
        });
      }
    };
    
    if (permissionGranted) {
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [isMobile, isMounted, permissionGranted]);
  
  // Handle initial mount for SSR
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-[70vh] bg-gradient-to-br from-slate-900 to-blue-900"></div>;
  }

  return (
    <div className="w-full h-[70vh] relative overflow-hidden">
      {isMobile && !permissionGranted && (
        <div className="absolute top-4 left-0 right-0 mx-auto z-10 bg-slate-900 text-white text-center p-2 rounded-md w-[80%] opacity-80">
          <button 
            onClick={async () => {
              if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                const permissionState = await (DeviceOrientationEvent as any).requestPermission();
                setPermissionGranted(permissionState === 'granted');
              } else {
                setPermissionGranted(true);
              }
            }}
            className="px-2 py-1 bg-blue-600 rounded-md text-sm"
          >
            Enable tilt effect
          </button>
        </div>
      )}
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[0, 3, 5]} intensity={0.5} color="#3B82F6" />
        
        {isMobile ? (
          <WebDevScene deviceOrientation={deviceOrientation || undefined} />
        ) : (
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            speed={1.5}
            zoom={1.2}
            snap
          >
            <WebDevScene />
          </PresentationControls>
        )}
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThreeScene; 