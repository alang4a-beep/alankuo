
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store';
import { LANE_WIDTH, GameStatus, THEME_CONFIG } from '../../types';

const StarField: React.FC = () => {
  const { speed, isManualSlowMotion, status } = useStore();
  const count = 3000; 
  const meshRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 400;
      let y = (Math.random() - 0.5) * 200 + 50; 
      
      let z = -550 + Math.random() * 650;

      if (Math.abs(x) < 15 && y > -5 && y < 20) {
          if (x < 0) x -= 15;
          else x += 15;
      }

      pos[i * 3] = x;     
      pos[i * 3 + 1] = y; 
      pos[i * 3 + 2] = z; 
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (status === GameStatus.PAUSED) return; 
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    let activeSpeed = speed > 0 ? speed : 2; 
    
    if (isManualSlowMotion) activeSpeed *= 0.3;

    for (let i = 0; i < count; i++) {
        let z = positions[i * 3 + 2];
        z += activeSpeed * delta * 2.0; 
        
        if (z > 100) {
            z = -550 - Math.random() * 50; 
            
            let x = (Math.random() - 0.5) * 400;
            let y = (Math.random() - 0.5) * 200 + 50;
            
            if (Math.abs(x) < 15 && y > -5 && y < 20) {
                if (x < 0) x -= 15;
                else x += 15;
            }

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
        }
        positions[i * 3 + 2] = z;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const LaneGuides: React.FC = () => {
    const { laneCount, getCurrentTheme } = useStore();
    const floorMatRef = useRef<THREE.MeshBasicMaterial>(null);
    
    useFrame(() => {
        const themeID = getCurrentTheme();
        const config = THEME_CONFIG[themeID];
        if (floorMatRef.current) {
            // Instant update, no lerp
            floorMatRef.current.color.set(config.floor);
        }
    });

    const separators = useMemo(() => {
        const lines: number[] = [];
        const startX = -(laneCount * LANE_WIDTH) / 2;
        
        for (let i = 0; i <= laneCount; i++) {
            lines.push(startX + (i * LANE_WIDTH));
        }
        return lines;
    }, [laneCount]);

    return (
        <group position={[0, 0.02, 0]}>
            {/* Lane Floor - Solid opaque base for high visibility */}
            <mesh position={[0, -0.02, -20]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[laneCount * LANE_WIDTH, 200]} />
                <meshBasicMaterial 
                    ref={floorMatRef}
                    color="#000000" 
                    transparent 
                    opacity={0.85} 
                />
            </mesh>

            {/* Lane Separators - Glowing Lines */}
            {separators.map((x, i) => (
                <mesh key={`sep-${i}`} position={[x, 0, -20]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.05, 200]} /> 
                    <meshBasicMaterial 
                        color="#ffffff" 
                        transparent 
                        opacity={0.3} 
                    />
                </mesh>
            ))}
        </group>
    );
};

const RetroSun: React.FC<{ sunTop: string, sunBottom: string }> = ({ sunTop, sunBottom }) => {
    const { status, getCurrentTheme } = useStore();
    const matRef = useRef<THREE.ShaderMaterial>(null);
    const sunGroupRef = useRef<THREE.Group>(null);
    
    useFrame((state, delta) => {
        if (status === GameStatus.PAUSED) return; 

        // Update colors instantly based on current props (which are derived from theme)
        // However, props passed to this component might lag one frame if parent re-renders.
        // Better to read theme directly if we want absolute sync, but props are cleaner for this component.
        // To ensure "instant" change without parent re-render lag, we can read theme here too.
        const themeID = getCurrentTheme();
        const config = THEME_CONFIG[themeID];

        if (matRef.current) {
            matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            matRef.current.uniforms.uColorTop.value.set(config.sunTop);
            matRef.current.uniforms.uColorBottom.value.set(config.sunBottom);
        }
        // Gentle bobbing
        if (sunGroupRef.current) {
            sunGroupRef.current.position.y = 30 + Math.sin(state.clock.elapsedTime * 0.2) * 1.0;
            sunGroupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorTop: { value: new THREE.Color(sunTop) },
        uColorBottom: { value: new THREE.Color(sunBottom) }
    }), []);

    return (
        <group ref={sunGroupRef} position={[0, 30, -180]}>
            <mesh>
                <sphereGeometry args={[35, 32, 32]} />
                <shaderMaterial
                    ref={matRef}
                    uniforms={uniforms}
                    transparent
                    vertexShader={`
                        varying vec2 vUv;

                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        varying vec2 vUv;
                        uniform float uTime;
                        uniform vec3 uColorTop;
                        uniform vec3 uColorBottom;

                        void main() {
                            vec3 color = mix(uColorBottom, uColorTop, vUv.y);
                            float stripeFreq = 40.0;
                            float stripeSpeed = 1.0;
                            float stripes = sin((vUv.y * stripeFreq) - (uTime * stripeSpeed));
                            float stripeMask = smoothstep(0.2, 0.3, stripes);
                            float scanlineFade = smoothstep(0.7, 0.3, vUv.y); 
                            vec3 finalColor = mix(color, color * 0.1, (1.0 - stripeMask) * scanlineFade);
                            gl_FragColor = vec4(finalColor, 1.0);
                        }
                    `}
                />
            </mesh>
        </group>
    );
};

const MovingGrid: React.FC<{ color: string }> = ({ color }) => {
    const { speed, isManualSlowMotion, status, getCurrentTheme } = useStore();
    const meshRef = useRef<THREE.Mesh>(null);
    const offsetRef = useRef(0);
    const matRef = useRef<THREE.MeshBasicMaterial>(null);
    
    useFrame((state, delta) => {
        if (status === GameStatus.PAUSED) return;

        const themeID = getCurrentTheme();
        const config = THEME_CONFIG[themeID];

        // Instant Color Update
        if (matRef.current) {
            matRef.current.color.set(config.grid);
        }

        if (meshRef.current) {
             let activeSpeed = speed > 0 ? speed : 5;
             if (isManualSlowMotion) activeSpeed *= 0.3;

             offsetRef.current += activeSpeed * delta;
             const cellSize = 10;
             const zPos = -100 + (offsetRef.current % cellSize);
             meshRef.current.position.z = zPos;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, -100]}>
            <planeGeometry args={[300, 400, 30, 40]} />
            <meshBasicMaterial 
                ref={matRef}
                color={color} 
                wireframe 
                transparent 
                opacity={0.25} 
            />
        </mesh>
    );
};

const ThemeController = () => {
    const { getCurrentTheme } = useStore();
    const { scene } = useThree();
    const themeID = getCurrentTheme();
    const config = THEME_CONFIG[themeID];

    useFrame(() => {
        const t = THEME_CONFIG[getCurrentTheme()];
        
        // Instant Update
        scene.background = new THREE.Color(t.background);
        scene.fog = new THREE.Fog(t.fog, 40, 160);
    });

    return (
        <>
            <ambientLight color={config.lightAmbient} intensity={0.3} />
            <directionalLight position={[0, 20, -10]} intensity={1.5} color={config.lightDir} />
            <pointLight position={[0, 25, -150]} intensity={2} color={config.lightPoint} distance={200} decay={2} />
            
            <MovingGrid color={config.grid} />
            <RetroSun sunTop={config.sunTop} sunBottom={config.sunBottom} />
        </>
    );
}

export const Environment: React.FC = () => {
  return (
    <>
      {/* Theme Controller handles Lights, Fog, Background, Grid, Sun */}
      <ThemeController />
      
      <StarField />
      <LaneGuides />
    </>
  );
};
