import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, TorusKnot, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 500 }) => {
  const mesh = useRef();
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const factor = Math.random() * 0.5 + 0.1;
      const speed = Math.random() * 0.01 + 0.005;
      temp.push({ x, y, z, factor, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      let { x, y, z, factor, speed } = particle;
      // Make particles drift slowly upwards
      const yPos = (y + time * speed * 10) % 20 - 10;
      const xPos = x + Math.sin(time * factor) * 0.5;
      const zPos = z + Math.cos(time * factor) * 0.5;
      
      dummy.position.set(xPos, yPos, zPos);
      
      // Calculate distance to pointer for repulsion effect
      const dx = state.pointer.x * viewport.width / 2 - xPos;
      const dy = state.pointer.y * viewport.height / 2 - yPos;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 2) {
        dummy.position.x -= dx * 0.1;
        dummy.position.y -= dy * 0.1;
      }
      
      const scale = 0.05 + Math.max(0, 1 - dist * 0.5) * 0.1;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <circleGeometry args={[0.2, 8]} />
      <meshBasicMaterial color="#4ade80" transparent opacity={0.2} depthWrite={false} />
    </instancedMesh>
  );
};

const AbstractShape = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Parallax effect based on mouse
    const targetX = (state.pointer.x * viewport.width) / 10;
    const targetY = (state.pointer.y * viewport.height) / 10;
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[3, 0.8, 128, 32]} />
        <meshBasicMaterial color="#1a1a1a" wireframe={false} />
        <Wireframe
          simplify={true}
          fillMix={0}
          fillOpacity={0}
          stroke={"#333333"}
          thickness={0.03}
        />
      </mesh>
    </Float>
  );
};

export const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-60 overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Optimize for high-DPI displays without destroying performance
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={600} />
        <AbstractShape />
      </Canvas>
    </div>
  );
};

// Export as default for React.lazy
export default HeroCanvas;
