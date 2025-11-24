

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store';
import { LANE_WIDTH, GameStatus, PetID } from '../../types';
import { audio } from '../System/Audio';

// Physics Constants
const GRAVITY = 50;
const JUMP_FORCE = 16; 

// Static Geometries for Default Skin
const TORSO_GEO = new THREE.CylinderGeometry(0.25, 0.15, 0.6, 4);
const JETPACK_GEO = new THREE.BoxGeometry(0.3, 0.4, 0.15);
const GLOW_STRIP_GEO = new THREE.PlaneGeometry(0.05, 0.2);
const HEAD_GEO = new THREE.BoxGeometry(0.25, 0.3, 0.3);
const ARM_GEO = new THREE.BoxGeometry(0.12, 0.6, 0.12);
const JOINT_SPHERE_GEO = new THREE.SphereGeometry(0.07);
const HIPS_GEO = new THREE.CylinderGeometry(0.16, 0.16, 0.2);
const LEG_GEO = new THREE.BoxGeometry(0.15, 0.7, 0.15);
const SHADOW_GEO = new THREE.CircleGeometry(0.5, 32);

// Pet Geometries
const BOX_HEAD = new THREE.BoxGeometry(0.4, 0.4, 0.4);

// --- PET COMPONENT ---
const Pet: React.FC<{ type: PetID }> = ({ type }) => {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    // Materials
    const marioMats = useMemo(() => ({
        hat: new THREE.MeshStandardMaterial({ color: '#ff0000' }),
        face: new THREE.MeshStandardMaterial({ color: '#ffccaa' }),
        shirt: new THREE.MeshStandardMaterial({ color: '#ff0000' }),
        overalls: new THREE.MeshStandardMaterial({ color: '#0000ff' }),
        shoes: new THREE.MeshStandardMaterial({ color: '#442200' }),
    }), []);

    const pikaMats = useMemo(() => ({
        body: new THREE.MeshStandardMaterial({ color: '#ffe600' }),
        cheeks: new THREE.MeshBasicMaterial({ color: '#ff0000' }),
        tips: new THREE.MeshBasicMaterial({ color: '#000000' }),
    }), []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            timeRef.current += delta * 15;
            // Running bobbing animation
            if (type !== PetID.MECHA) {
                groupRef.current.position.y = 0.5 + Math.abs(Math.sin(timeRef.current)) * 0.3;
            }
        }
    });

    if (type === PetID.MARIO) {
        return (
            // Adjusted Position: Forward (Z: 0.5) and Up (Y: 0.5) to be more visible
            <group ref={groupRef} position={[1.2, 0.5, 0.5]} scale={0.6}>
                {/* Mario Voxel Model */}
                 <group position={[0, 0.8, 0]}>
                    <mesh geometry={BOX_HEAD} material={marioMats.hat} />
                    <mesh position={[0, -0.15, 0.1]} geometry={new THREE.BoxGeometry(0.38, 0.2, 0.2)} material={marioMats.face} />
                </group>
                <mesh position={[0, 0.35, 0]} geometry={new THREE.BoxGeometry(0.38, 0.3, 0.28)} material={marioMats.shirt} />
                <mesh position={[0, 0.1, 0]} geometry={new THREE.BoxGeometry(0.4, 0.3, 0.3)} material={marioMats.overalls} />
                <mesh position={[0.12, -0.3, 0]} geometry={new THREE.BoxGeometry(0.14, 0.4, 0.2)} material={marioMats.overalls} />
                <mesh position={[-0.12, -0.3, 0]} geometry={new THREE.BoxGeometry(0.14, 0.4, 0.2)} material={marioMats.overalls} />
            </group>
        );
    } 
    
    if (type === PetID.PIKACHU) {
        return (
            // Adjusted Position: Forward (Z: 0.5) and Up (Y: 0.5) to be more visible
            <group ref={groupRef} position={[-1.2, 0.5, 0.5]} scale={0.5}>
                {/* Pikachu Geometric Model */}
                <mesh position={[0, 0.5, 0]} geometry={new THREE.BoxGeometry(0.6, 0.8, 0.5)} material={pikaMats.body} />
                <mesh position={[0.2, 0.6, 0.26]} geometry={new THREE.PlaneGeometry(0.15, 0.15)} material={pikaMats.cheeks} />
                <mesh position={[-0.2, 0.6, 0.26]} geometry={new THREE.PlaneGeometry(0.15, 0.15)} material={pikaMats.cheeks} />
                
                {/* Ears */}
                <group position={[0, 0.9, 0]}>
                    <mesh position={[0.2, 0.3, 0]} rotation={[0,0,-0.4]} geometry={new THREE.ConeGeometry(0.1, 0.8, 8)} material={pikaMats.body} />
                    <mesh position={[-0.2, 0.3, 0]} rotation={[0,0,0.4]} geometry={new THREE.ConeGeometry(0.1, 0.8, 8)} material={pikaMats.body} />
                </group>
                
                {/* Tail */}
                <mesh position={[0, 0.4, -0.4]} rotation={[0.5,0,0]} geometry={new THREE.BoxGeometry(0.2, 0.6, 0.05)} material={pikaMats.body} />
            </group>
        );
    }
    
    if (type === PetID.MECHA) {
         return (
            // Adjusted position: Higher (1.6) and further back (-0.45) to avoid clipping with torso
            <group position={[0, 1.6, -0.45]} scale={0.8}>
                {/* Back Wings Attachment */}
                <mesh position={[0, 0, 0]} geometry={new THREE.BoxGeometry(0.4, 0.5, 0.2)}>
                    <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
                </mesh>
                <mesh position={[0.6, 0.4, -0.1]} rotation={[0, 0, -0.4]}>
                    <boxGeometry args={[1.0, 0.15, 0.3]} />
                    <meshStandardMaterial color="#aa00ff" emissive="#aa00ff" emissiveIntensity={2} />
                </mesh>
                <mesh position={[-0.6, 0.4, -0.1]} rotation={[0, 0, 0.4]}>
                    <boxGeometry args={[1.0, 0.15, 0.3]} />
                    <meshStandardMaterial color="#aa00ff" emissive="#aa00ff" emissiveIntensity={2} />
                </mesh>
            </group>
         );
    }

    return null;
}

export const Player: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  
  // Limb Refs for Animation
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const { 
      status, 
      laneCount, 
      takeDamage, 
      hasDoubleJump, 
      activateImmortality, 
      isImmortalityActive, 
      setManualSlowMotion, 
      hasFireball, 
      lastFireballTime, 
      useFireball,
      hasFlight,
      isFlying,
      startFlight,
      endFlight,
      lastFlightEndTime,
      flightStartTime,
      activePets
  } = useStore();
  
  const [lane, setLane] = React.useState(0);
  const targetX = useRef(0);
  
  // Physics State
  const isJumping = useRef(false);
  const velocityY = useRef(0);
  const jumpsPerformed = useRef(0); 
  const spinRotation = useRef(0);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const isInvincible = useRef(false);
  const lastDamageTime = useRef(0);

  // Default Materials
  const materials = useMemo(() => {
      const isImmortal = isImmortalityActive;
      return {
          armor: new THREE.MeshStandardMaterial({ color: isImmortal ? '#ffd700' : '#00aaff', roughness: 0.3, metalness: 0.8 }),
          joint: new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.7, metalness: 0.5 }),
          glow: new THREE.MeshBasicMaterial({ color: isImmortal ? '#ffffff' : '#00ffff' }),
          shadow: new THREE.MeshBasicMaterial({ color: '#000000', opacity: 0.3, transparent: true })
      };
  }, [isImmortalityActive]);

  // --- Reset State on Game Start ---
  useEffect(() => {
      if (status === GameStatus.PLAYING) {
          isJumping.current = false;
          jumpsPerformed.current = 0;
          velocityY.current = 0;
          spinRotation.current = 0;
          if (groupRef.current) groupRef.current.position.y = 0;
          if (bodyRef.current) bodyRef.current.rotation.x = 0;
          if (isFlying) endFlight();
      }
  }, [status]);
  
  // Safety: Clamp lane if laneCount changes (e.g. restart)
  useEffect(() => {
      const maxLane = Math.floor(laneCount / 2);
      if (Math.abs(lane) > maxLane) {
          setLane(l => Math.max(Math.min(l, maxLane), -maxLane));
      }
  }, [laneCount, lane]);

  // --- Controls (Keyboard & Touch) ---
  const triggerJump = () => {
    if (isFlying) return; 

    const maxJumps = hasDoubleJump ? 2 : 1;

    if (!isJumping.current) {
        audio.playJump(false);
        isJumping.current = true;
        jumpsPerformed.current = 1;
        velocityY.current = JUMP_FORCE;
    } else if (jumpsPerformed.current < maxJumps) {
        audio.playJump(true);
        jumpsPerformed.current += 1;
        velocityY.current = JUMP_FORCE; 
        spinRotation.current = 0; 
    }
  };

  // --- Skill Logic Handlers ---
  const handleFireballAction = () => {
      const now = Date.now();
      if (hasFireball && now - lastFireballTime > 1000) { // Reduced to 1s cooldown
          if (groupRef.current) {
              useFireball();
              window.dispatchEvent(new CustomEvent('player-shoot', { 
                  detail: { position: groupRef.current.position } 
              }));
              audio.playJump(false); 
          }
      }
  };

  const handleFlightAction = () => {
      if (hasFlight) {
          if (isFlying) {
              endFlight(); 
          } else {
              const now = Date.now();
              const cooldownOver = now - lastFlightEndTime > 20000;
              if (cooldownOver) {
                  startFlight();
              }
          }
      }
  };

  const handleImmortalityAction = () => {
      activateImmortality();
  }

  // --- Listeners ---
  useEffect(() => {
      window.addEventListener('cmd-fireball', handleFireballAction);
      window.addEventListener('cmd-flight', handleFlightAction);
      window.addEventListener('cmd-immortal', handleImmortalityAction);
      
      return () => {
          window.removeEventListener('cmd-fireball', handleFireballAction);
          window.removeEventListener('cmd-flight', handleFlightAction);
          window.removeEventListener('cmd-immortal', handleImmortalityAction);
      }
  }, [hasFireball, lastFireballTime, useFireball, hasFlight, isFlying, startFlight, endFlight, lastFlightEndTime, activateImmortality]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== GameStatus.PLAYING) return;
      const maxLane = Math.floor(laneCount / 2);
      
      const isUpKey = e.key === 'ArrowUp' || e.key === 'w';

      if (e.key === 'ArrowLeft') setLane(l => Math.max(l - 1, -maxLane));
      else if (e.key === 'ArrowRight') setLane(l => Math.min(l + 1, maxLane));
      else if (isUpKey) {
          triggerJump();
      } else if (e.key === 'Enter' || e.key.toLowerCase() === 'z') {
          handleImmortalityAction();
      } else if (e.key === ' ') {
          setManualSlowMotion(true);
      } else if (e.key.toLowerCase() === 'x') {
          handleFireballAction();
      } else if (e.key.toLowerCase() === 'c') {
          handleFlightAction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === ' ') {
            setManualSlowMotion(false);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, [status, laneCount, hasDoubleJump, activateImmortality, setManualSlowMotion, hasFireball, lastFireballTime, useFireball, hasFlight, isFlying, startFlight, endFlight, lastFlightEndTime]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
        if (status !== GameStatus.PLAYING) return;
        const target = e.target as HTMLElement;
        if (target.closest('button')) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;
        const maxLane = Math.floor(laneCount / 2);

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
             if (deltaX > 0) setLane(l => Math.min(l + 1, maxLane));
             else setLane(l => Math.max(l - 1, -maxLane));
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -30) {
            triggerJump();
        } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
            handleImmortalityAction();
        }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [status, laneCount, hasDoubleJump, activateImmortality]);

  // --- Animation Loop ---
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (status !== GameStatus.PLAYING && status !== GameStatus.SHOP) return;

    if (isFlying) {
        if (Date.now() - flightStartTime > 10000) {
            endFlight();
        }
    }

    targetX.current = lane * LANE_WIDTH;
    groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, 
        targetX.current, 
        delta * 15 
    );

    if (isFlying) {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 4.5, delta * 3.0);
        velocityY.current = 0;
        isJumping.current = false;
        if (bodyRef.current) {
             bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, -Math.PI / 2, delta * 5);
        }
    } else if (isJumping.current) {
        groupRef.current.position.y += velocityY.current * delta;
        velocityY.current -= GRAVITY * delta;
        if (groupRef.current.position.y <= 0) {
            groupRef.current.position.y = 0;
            isJumping.current = false;
            jumpsPerformed.current = 0;
            velocityY.current = 0;
            if (bodyRef.current) bodyRef.current.rotation.x = 0;
        }
        if (jumpsPerformed.current === 2 && bodyRef.current) {
             spinRotation.current -= delta * 15;
             if (spinRotation.current < -Math.PI * 2) spinRotation.current = -Math.PI * 2;
             bodyRef.current.rotation.x = spinRotation.current;
        }
    } else {
        if (groupRef.current.position.y > 0) {
            velocityY.current -= GRAVITY * delta;
            groupRef.current.position.y += velocityY.current * delta;
            if (groupRef.current.position.y <= 0) {
                groupRef.current.position.y = 0;
                velocityY.current = 0;
                if (bodyRef.current) bodyRef.current.rotation.x = 0;
            }
        } else {
             if (bodyRef.current) bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, 0, delta * 10);
        }
    }

    const xDiff = targetX.current - groupRef.current.position.x;
    groupRef.current.rotation.z = -xDiff * 0.2; 
    if (!isFlying) {
        groupRef.current.rotation.x = isJumping.current ? 0.1 : 0.05; 
    } else {
        groupRef.current.rotation.x = 0;
    }

    const time = state.clock.elapsedTime * 25; 
    
    // Animation
    if (!isJumping.current && !isFlying) {
        if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(time) * 0.7;
        if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(time + Math.PI) * 0.7;
        if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(time + Math.PI) * 1.0;
        if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(time) * 1.0;
        if (bodyRef.current) bodyRef.current.position.y = 1.1 + Math.abs(Math.sin(time)) * 0.1;
    } else if (isFlying) {
        if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -Math.PI, delta * 5);
        if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.PI, delta * 5);
        if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 5);
        if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 5);
        if (bodyRef.current) bodyRef.current.position.y = 1.1; 
    } else {
        const jumpPoseSpeed = delta * 10;
        if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -2.5, jumpPoseSpeed);
        if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -2.5, jumpPoseSpeed);
        if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0.5, jumpPoseSpeed);
        if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, -0.5, jumpPoseSpeed);
        if (bodyRef.current && jumpsPerformed.current !== 2) bodyRef.current.position.y = 1.1; 
    }

    if (shadowRef.current) {
        const height = groupRef.current.position.y;
        const scale = Math.max(0.2, 1 - (height / 5.0) * 0.8);
        const runStretch = (isJumping.current || isFlying) ? 1 : 1 + Math.abs(Math.sin(time)) * 0.3;
        shadowRef.current.scale.set(scale, scale, scale * runStretch);
        const material = shadowRef.current.material as THREE.MeshBasicMaterial;
        if (material && !Array.isArray(material)) {
            material.opacity = Math.max(0.05, 0.3 - (height / 5.0) * 0.3);
        }
    }

    const showFlicker = isInvincible.current || isImmortalityActive;
    if (showFlicker) {
        if (isInvincible.current) {
             if (Date.now() - lastDamageTime.current > 1500) {
                isInvincible.current = false;
                groupRef.current.visible = true;
             } else {
                groupRef.current.visible = Math.floor(Date.now() / 50) % 2 === 0;
             }
        } 
        if (isImmortalityActive) {
            groupRef.current.visible = true; 
        }
    } else {
        groupRef.current.visible = true;
    }
  });

  useEffect(() => {
     const checkHit = (e: any) => {
        if (isInvincible.current || isImmortalityActive || isFlying) return; 
        audio.playDamage(); 
        takeDamage();
        isInvincible.current = true;
        lastDamageTime.current = Date.now();
     };
     window.addEventListener('player-hit', checkHit);
     return () => window.removeEventListener('player-hit', checkHit);
  }, [takeDamage, isImmortalityActive, isFlying]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
        {/* Render Active Pets */}
        {activePets.map(pet => <Pet key={pet} type={pet} />)}
        
        <group ref={bodyRef} position={[0, 1.1, 0]}> 
            <mesh castShadow position={[0, 0.2, 0]} geometry={TORSO_GEO} material={materials.armor} />
            <mesh position={[0, 0.2, -0.2]} geometry={JETPACK_GEO} material={materials.joint} />
            <mesh position={[-0.08, 0.1, -0.28]} geometry={GLOW_STRIP_GEO} material={materials.glow} />
            <mesh position={[0.08, 0.1, -0.28]} geometry={GLOW_STRIP_GEO} material={materials.glow} />
            
            {isFlying && (
                <>
                    <mesh position={[-0.1, -0.2, -0.3]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.05, 0.5, 8]} /><meshBasicMaterial color="#ff5500" transparent opacity={0.8} /></mesh>
                    <mesh position={[0.1, -0.2, -0.3]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.05, 0.5, 8]} /><meshBasicMaterial color="#ff5500" transparent opacity={0.8} /></mesh>
                </>
            )}

            <group ref={headRef} position={[0, 0.6, 0]}>
                <mesh castShadow geometry={HEAD_GEO} material={materials.armor} />
            </group>

            <group position={[0.32, 0.4, 0]}>
                <group ref={rightArmRef}>
                    <mesh position={[0, -0.25, 0]} castShadow geometry={ARM_GEO} material={materials.armor} />
                    <mesh position={[0, -0.55, 0]} geometry={JOINT_SPHERE_GEO} material={materials.glow} />
                </group>
            </group>
            <group position={[-0.32, 0.4, 0]}>
                <group ref={leftArmRef}>
                    <mesh position={[0, -0.25, 0]} castShadow geometry={ARM_GEO} material={materials.armor} />
                    <mesh position={[0, -0.55, 0]} geometry={JOINT_SPHERE_GEO} material={materials.glow} />
                </group>
            </group>

            <mesh position={[0, -0.15, 0]} geometry={HIPS_GEO} material={materials.joint} />

            <group position={[0.12, -0.25, 0]}>
                <group ref={rightLegRef}><mesh position={[0, -0.35, 0]} castShadow geometry={LEG_GEO} material={materials.armor} /></group>
            </group>
            <group position={[-0.12, -0.25, 0]}>
                <group ref={leftLegRef}><mesh position={[0, -0.35, 0]} castShadow geometry={LEG_GEO} material={materials.armor} /></group>
            </group>
        </group>
        <mesh ref={shadowRef} position={[0, 0.02, 0]} rotation={[-Math.PI/2, 0, 0]} geometry={SHADOW_GEO} material={materials.shadow} />
    </group>
  );
};
