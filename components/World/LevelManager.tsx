
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Center } from '@react-three/drei';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../store';
import { GameObject, ObjectType, LANE_WIDTH, SPAWN_DISTANCE, REMOVE_DISTANCE, GameStatus, NEON_COLORS, Difficulty, PetID } from '../../types';
import { audio } from '../System/Audio';

// Geometry Constants
const OBSTACLE_HEIGHT = 1.6;
const OBSTACLE_TALL_HEIGHT = 3.2; 

const OBSTACLE_GEOMETRY = new THREE.ConeGeometry(0.9, OBSTACLE_HEIGHT, 6);
const OBSTACLE_TALL_GEOMETRY = new THREE.CylinderGeometry(0.7, 0.9, OBSTACLE_TALL_HEIGHT, 6); 

const OBSTACLE_GLOW_GEO = new THREE.ConeGeometry(0.9, OBSTACLE_HEIGHT, 6);
const OBSTACLE_TALL_GLOW_GEO = new THREE.CylinderGeometry(0.75, 0.95, OBSTACLE_TALL_HEIGHT, 6);

const OBSTACLE_RING_GEO = new THREE.RingGeometry(0.6, 0.9, 6);

const GEM_GEOMETRY = new THREE.IcosahedronGeometry(0.3, 0);

// Alien Geometries
const ALIEN_BODY_GEO = new THREE.CylinderGeometry(0.6, 0.3, 0.3, 8);
const ALIEN_DOME_GEO = new THREE.SphereGeometry(0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI/2);
const ALIEN_EYE_GEO = new THREE.SphereGeometry(0.1);

// Missile Geometries
const MISSILE_CORE_GEO = new THREE.CylinderGeometry(0.08, 0.08, 3.0, 8);
const MISSILE_RING_GEO = new THREE.TorusGeometry(0.15, 0.02, 16, 32);

// Projectile Geometry
const PROJECTILE_GEO = new THREE.SphereGeometry(0.4, 8, 8);
const LIGHTNING_GEO = new THREE.CylinderGeometry(0.1, 0.3, 2.0, 8); // For Pikachu

// Shadow Geometries
const SHADOW_GEM_GEO = new THREE.CircleGeometry(0.6, 32);
const SHADOW_ALIEN_GEO = new THREE.CircleGeometry(0.8, 32);
const SHADOW_MISSILE_GEO = new THREE.PlaneGeometry(0.15, 3);
const SHADOW_DEFAULT_GEO = new THREE.CircleGeometry(0.8, 6);
const SHADOW_CHAR_GEO = new THREE.CircleGeometry(1.5, 16); 

// Shop Geometries
const SHOP_FRAME_GEO = new THREE.BoxGeometry(1, 7, 1); 
const SHOP_BACK_GEO = new THREE.BoxGeometry(1, 5, 1.2); 
const SHOP_OUTLINE_GEO = new THREE.BoxGeometry(1, 7.2, 0.8); 
const SHOP_FLOOR_GEO = new THREE.PlaneGeometry(1, 4); 

const PARTICLE_COUNT = 600;
const SPAWN_INTERVAL_BASE = 150; 

// --- Helper: Generate Chinese Char Texture ---
const createCharTexture = (char: string, color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; 
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.clearRect(0,0, 512, 512);
        ctx.fillStyle = color; 
        ctx.font = '300px "Microsoft JhengHei", "Noto Sans TC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(char, 256, 256);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.strokeText(char, 256, 256);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace; 
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    return tex;
}

// --- Particle System ---
const ParticleSystem: React.FC = () => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    const particles = useMemo(() => new Array(PARTICLE_COUNT).fill(0).map(() => ({
        life: 0,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        rot: new THREE.Vector3(),
        rotVel: new THREE.Vector3(),
        color: new THREE.Color()
    })), []);

    useEffect(() => {
        const handleExplosion = (e: CustomEvent) => {
            const { position, color } = e.detail;
            let spawned = 0;
            const burstAmount = 40; 

            for(let i = 0; i < PARTICLE_COUNT; i++) {
                const p = particles[i];
                if (p.life <= 0) {
                    p.life = 1.0 + Math.random() * 0.5; 
                    p.pos.set(position[0], position[1], position[2]);
                    
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    const speed = 2 + Math.random() * 10;
                    
                    p.vel.set(
                        Math.sin(phi) * Math.cos(theta),
                        Math.sin(phi) * Math.sin(theta),
                        Math.cos(phi)
                    ).multiplyScalar(speed);

                    p.rot.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                    p.rotVel.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).multiplyScalar(5);
                    
                    p.color.set(color);
                    
                    spawned++;
                    if (spawned >= burstAmount) break;
                }
            }
        };
        
        window.addEventListener('particle-burst', handleExplosion as any);
        return () => window.removeEventListener('particle-burst', handleExplosion as any);
    }, [particles]);

    useFrame((state, delta) => {
        if (!mesh.current) return;
        const safeDelta = Math.min(delta, 0.1);

        particles.forEach((p, i) => {
            if (p.life > 0) {
                p.life -= safeDelta * 1.5;
                p.pos.addScaledVector(p.vel, safeDelta);
                p.vel.y -= safeDelta * 5; 
                p.vel.multiplyScalar(0.98);

                p.rot.x += p.rotVel.x * safeDelta;
                p.rot.y += p.rotVel.y * safeDelta;
                
                dummy.position.copy(p.pos);
                const scale = Math.max(0, p.life * 0.25);
                dummy.scale.set(scale, scale, scale);
                
                dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
                dummy.updateMatrix();
                
                mesh.current!.setMatrixAt(i, dummy.matrix);
                mesh.current!.setColorAt(i, p.color);
            } else {
                dummy.scale.set(0,0,0);
                dummy.updateMatrix();
                mesh.current!.setMatrixAt(i, dummy.matrix);
            }
        });
        
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
        </instancedMesh>
    );
};


const getRandomLane = (laneCount: number) => {
    const max = Math.floor(laneCount / 2);
    return Math.floor(Math.random() * (max * 2 + 1)) - max;
};

export const LevelManager: React.FC = () => {
  const { 
    status, 
    speed, 
    collectGem, 
    submitAnswer, 
    currentVocab,
    getRandomDistractor,
    laneCount,
    setDistance,
    openShop,
    level,
    isManualSlowMotion,
    addScore,
    registerIgnore,
    difficulty,
    hasMagnet,
    activePets,
    lastPetActionTime,
    updatePetActionTime
  } = useStore();
  
  const objectsRef = useRef<GameObject[]>([]);
  const [renderTrigger, setRenderTrigger] = useState(0);
  const prevStatus = useRef(status);
  const prevLevel = useRef(level);
  
  const playerObjRef = useRef<THREE.Object3D | null>(null);
  const distanceTraveled = useRef(0);
  const nextSpawnDistance = useRef(SPAWN_INTERVAL_BASE);

  // Handle resets and transitions
  useEffect(() => {
    const isRestart = status === GameStatus.PLAYING && prevStatus.current === GameStatus.GAME_OVER;
    const isMenuReset = status === GameStatus.MENU;
    const isLevelUp = level !== prevLevel.current && status === GameStatus.PLAYING;
    const isVictoryReset = status === GameStatus.PLAYING && prevStatus.current === GameStatus.VICTORY;

    if (isMenuReset || isRestart || isVictoryReset) {
        objectsRef.current = [];
        setRenderTrigger(t => t + 1);
        distanceTraveled.current = 0;
        nextSpawnDistance.current = SPAWN_INTERVAL_BASE;

    } else if (isLevelUp && level > 1) {
        let furthestZ = -50;
        const staticObjects = objectsRef.current.filter(o => o.type !== ObjectType.MISSILE && o.type !== ObjectType.PROJECTILE && o.type !== ObjectType.LIGHTNING);
        if (staticObjects.length > 0) {
             furthestZ = Math.min(...staticObjects.map(o => o.position[2]));
        }

        const portalZ = Math.min(furthestZ - 30, -100);

        objectsRef.current.push({
            id: uuidv4(),
            type: ObjectType.SHOP_PORTAL,
            position: [0, 0, portalZ], 
            active: true,
        });
        
        // Scale shop spawn distance logic so it's not too abrupt
        nextSpawnDistance.current = distanceTraveled.current + Math.max(80, speed * 1.5);
        setRenderTrigger(t => t + 1);
        
    } else if (status === GameStatus.GAME_OVER || status === GameStatus.VICTORY) {
        setDistance(Math.floor(distanceTraveled.current));
    }
    
    prevStatus.current = status;
    prevLevel.current = level;
  }, [status, level, setDistance, speed]);

  useEffect(() => {
    const handleShoot = (e: CustomEvent) => {
        const { position } = e.detail;
        if (position) {
            objectsRef.current.push({
                id: uuidv4(),
                type: ObjectType.PROJECTILE,
                position: [position.x, position.y + 0.5, position.z - 1.5],
                active: true,
                color: '#ff5500'
            });
            setRenderTrigger(t => t + 1);
        }
    };
    
    window.addEventListener('player-shoot', handleShoot as any);
    return () => window.removeEventListener('player-shoot', handleShoot as any);
  }, []);

  useFrame((state) => {
      if (!playerObjRef.current) {
          const group = state.scene.getObjectByName('PlayerGroup');
          if (group && group.children.length > 0) {
              playerObjRef.current = group.children[0];
          }
      }
  });

  useFrame((state, delta) => {
    if (status !== GameStatus.PLAYING) return;
    
    const safeDelta = Math.min(delta, 0.05); 
    let modifier = 1.0;
    if (isManualSlowMotion) modifier *= 0.3;

    const effectiveSpeed = speed * modifier;
    const dist = effectiveSpeed * safeDelta;
    
    distanceTraveled.current += dist;

    let hasChanges = false;
    let playerPos = new THREE.Vector3(0, 0, 0);
    
    if (playerObjRef.current) {
        playerObjRef.current.getWorldPosition(playerPos);
    }

    const currentObjects = objectsRef.current;
    const keptObjects: GameObject[] = [];
    const newSpawns: GameObject[] = [];

    const enemies = currentObjects.filter(o => (o.type === ObjectType.OBSTACLE || o.type === ObjectType.ALIEN) && o.active);
    
    // --- PIKACHU LIGHTNING LOGIC ---
    if (activePets.includes(PetID.PIKACHU)) {
        const now = Date.now();
        if (now - lastPetActionTime > 3000) { // Every 3 seconds
            updatePetActionTime();
            newSpawns.push({
                id: uuidv4(),
                type: ObjectType.LIGHTNING,
                position: [playerPos.x, 1.0, playerPos.z - 2],
                active: true,
                color: '#ffe600'
            });
            audio.playJump(false); 
            hasChanges = true;
        }
    }

    for (const obj of currentObjects) {
        let moveAmount = dist;
        const MISSILE_SPEED = 30;
        const PROJECTILE_SPEED = 40;
        const LIGHTNING_SPEED = 50;
        
        // MAGNET LOGIC
        let applyMagnet = false;
        
        if (obj.type === ObjectType.GEM && obj.active) {
            if (hasMagnet) {
                applyMagnet = true;
            } else if (activePets.includes(PetID.MARIO)) {
                // Mario collects gems in current lane automatically if moderately close
                const laneWidthHalf = LANE_WIDTH / 2;
                const inSameLane = Math.abs(obj.position[0] - playerPos.x) < laneWidthHalf + 0.5;
                if (inSameLane) applyMagnet = true;
            }

            if (applyMagnet) {
                const dx = playerPos.x - obj.position[0];
                const dy = (playerPos.y + 1) - obj.position[1];
                const dz = playerPos.z - obj.position[2];
                const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                // Suction range: 15 units (or 25 for Mario bonus lane)
                if (distance < 20) {
                    const suctionSpeed = 15 * safeDelta;
                    obj.position[0] += dx * suctionSpeed;
                    obj.position[1] += dy * suctionSpeed;
                    obj.position[2] += dz * suctionSpeed;
                }
            }
        }

        if (obj.type === ObjectType.MISSILE) {
            moveAmount += MISSILE_SPEED * safeDelta * modifier; 
        } else if (obj.type === ObjectType.PROJECTILE) {
            moveAmount = 0;
            obj.position[2] -= PROJECTILE_SPEED * safeDelta;
        } else if (obj.type === ObjectType.LIGHTNING) {
            moveAmount = 0;
            obj.position[2] -= LIGHTNING_SPEED * safeDelta;
        }

        const prevZ = obj.position[2];
        
        if (obj.type !== ObjectType.PROJECTILE && obj.type !== ObjectType.LIGHTNING) {
            obj.position[2] += moveAmount;
        }
        
        // Projectile / Lightning Collision with Enemies
        if ((obj.type === ObjectType.PROJECTILE || obj.type === ObjectType.LIGHTNING) && obj.active) {
            for (const enemy of enemies) {
                if (!enemy.active) continue;
                
                const dx = Math.abs(obj.position[0] - enemy.position[0]);
                const dz = Math.abs(obj.position[2] - enemy.position[2]);
                
                if (dx < 1.0 && dz < 1.5) {
                    obj.active = false;
                    enemy.active = false;
                    hasChanges = true;
                    addScore(500);

                    window.dispatchEvent(new CustomEvent('particle-burst', { 
                        detail: { position: enemy.position, color: '#ffaa00' } 
                    }));
                    audio.playProjectileHit(); 
                    break;
                }
            }
            if (obj.position[2] < -150) {
                obj.active = false;
                hasChanges = true;
            }
        }
        
        if (obj.type === ObjectType.ALIEN && obj.active && !obj.hasFired) {
             if (obj.position[2] > -90) {
                 obj.hasFired = true;
                 newSpawns.push({
                     id: uuidv4(),
                     type: ObjectType.MISSILE,
                     position: [obj.position[0], 1.0, obj.position[2] + 2], 
                     active: true,
                     color: '#ff0000'
                 });
                 hasChanges = true;
                 window.dispatchEvent(new CustomEvent('particle-burst', { 
                    detail: { position: obj.position, color: '#ff00ff' } 
                 }));
             }
        }

        let keep = true;
        if (obj.active) {
            const zThreshold = 2.0; 
            const inZZone = (prevZ < playerPos.z + zThreshold) && (obj.position[2] > playerPos.z - zThreshold);
            
            if (obj.type === ObjectType.SHOP_PORTAL) {
                const dz = Math.abs(obj.position[2] - playerPos.z);
                if (dz < 2) { 
                     openShop();
                     obj.active = false;
                     hasChanges = true;
                     keep = false; 
                }
            } else if (inZZone) {
                const dx = Math.abs(obj.position[0] - playerPos.x);
                if (dx < 0.9) { 
                     
                     const isDamageSource = obj.type === ObjectType.OBSTACLE || obj.type === ObjectType.ALIEN || obj.type === ObjectType.MISSILE;
                     
                     if (isDamageSource) {
                         const playerBottom = playerPos.y;
                         const playerTop = playerPos.y + 1.8;
                         let objBottom = obj.position[1] - 0.5;
                         let objTop = obj.position[1] + 0.5;

                         if (obj.type === ObjectType.OBSTACLE) {
                             objBottom = 0;
                             if (obj.variant === 'tall') {
                                 objTop = OBSTACLE_TALL_HEIGHT;
                             } else {
                                 objTop = OBSTACLE_HEIGHT;
                             }
                         } else if (obj.type === ObjectType.MISSILE) {
                             objBottom = 0.5;
                             objTop = 1.5;
                         }

                         const isHit = (playerBottom < objTop) && (playerTop > objBottom);
                         if (isHit) { 
                             window.dispatchEvent(new Event('player-hit'));
                             obj.active = false; 
                             hasChanges = true;
                             if (obj.type === ObjectType.MISSILE) {
                                window.dispatchEvent(new CustomEvent('particle-burst', { 
                                    detail: { position: obj.position, color: '#ff4400' } 
                                }));
                             }
                         }
                     } else if (obj.type !== ObjectType.PROJECTILE && obj.type !== ObjectType.LIGHTNING) { 
                         const dy = Math.abs(obj.position[1] - playerPos.y);
                         
                         if (dy < 4.0) { 
                            if (obj.type === ObjectType.GEM) {
                                // If Mario, multiplier handled inside collectGem
                                collectGem(obj.points || 50, activePets.includes(PetID.MARIO));
                                audio.playGemCollect();
                                window.dispatchEvent(new CustomEvent('particle-burst', { 
                                    detail: { position: obj.position, color: obj.color || '#ffffff' } 
                                }));
                            }
                            if (obj.type === ObjectType.LETTER && obj.value) {
                                const isCorrect = submitAnswer(obj.value);
                                if (isCorrect) {
                                    audio.playLetterCollect(); 
                                    window.dispatchEvent(new CustomEvent('particle-burst', { 
                                        detail: { position: obj.position, color: '#00ff00' } 
                                    }));
                                } else {
                                    audio.playDamage(); 
                                    window.dispatchEvent(new CustomEvent('particle-burst', { 
                                        detail: { position: obj.position, color: '#ff0000' } 
                                    }));
                                }
                            }
                            obj.active = false;
                            hasChanges = true;
                         }
                     }
                }
            }
        }

        if (obj.position[2] > REMOVE_DISTANCE && obj.type !== ObjectType.PROJECTILE && obj.type !== ObjectType.LIGHTNING) {
            if (obj.type === ObjectType.LETTER && obj.isTarget && obj.active) {
                registerIgnore();
            }
            keep = false;
            hasChanges = true;
        }

        if (keep) {
            keptObjects.push(obj);
        }
    }

    if (newSpawns.length > 0) {
        keptObjects.push(...newSpawns);
    }

    // Spawning Logic
    let furthestZ = -20;
    const staticObjects = keptObjects.filter(o => o.type !== ObjectType.MISSILE && o.type !== ObjectType.PROJECTILE && o.type !== ObjectType.LIGHTNING);
    if (staticObjects.length > 0) {
        furthestZ = Math.min(...staticObjects.map(o => o.position[2]));
    }

    // Scale spawn visibility distance with speed (look ahead)
    // Base 120, but at speed 300 we need ~360 to see 1.2s ahead
    const dynamicSpawnDistance = Math.max(SPAWN_DISTANCE, speed * 1.2);

    if (furthestZ > -dynamicSpawnDistance) {
         // Increase gap at high speeds to prevent overlap visual chaos
         // At 300 speed, gap ~ 120 units (0.4s)
         const minGap = Math.max(15, speed * 0.4); 
         
         const spawnZ = Math.min(furthestZ - minGap, -dynamicSpawnDistance);
         
         const isQuestionDue = distanceTraveled.current >= nextSpawnDistance.current;

         if (isQuestionDue && currentVocab) {
             const lane = getRandomLane(laneCount);
             const isTarget = Math.random() < 0.4;
             const val = isTarget ? currentVocab.char : getRandomDistractor();
             
             keptObjects.push({
                id: uuidv4(),
                type: ObjectType.LETTER,
                position: [lane * LANE_WIDTH, 2.5, spawnZ], 
                active: true,
                color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
                value: val,
                isTarget: isTarget
             });
             
             // Scale interval: maintain roughly 2 seconds between questions regardless of speed
             // At speed 22.5 -> ~45 units. At speed 300 -> ~600 units.
             const nextInterval = Math.max(40, speed * 2.0);
             nextSpawnDistance.current = distanceTraveled.current + nextInterval; 
             hasChanges = true;

         } else if (Math.random() > 0.1) { 
            // OBSTACLE SPAWNING
            const isObstacle = Math.random() > 0.20;

            if (isObstacle) {
                const spawnAlien = level >= 2 && Math.random() < 0.2;

                if (spawnAlien) {
                    const lane = getRandomLane(laneCount);
                    keptObjects.push({
                        id: uuidv4(),
                        type: ObjectType.ALIEN,
                        position: [lane * LANE_WIDTH, 1.5, spawnZ],
                        active: true,
                        color: '#00ff00',
                        hasFired: false
                    });
                } else {
                    const availableLanes = [];
                    const maxLane = Math.floor(laneCount / 2);
                    for (let i = -maxLane; i <= maxLane; i++) availableLanes.push(i);
                    availableLanes.sort(() => Math.random() - 0.5);

                    const spawnWall = difficulty === Difficulty.COMPLEX && Math.random() < 0.15; 
                    const spawnTower = difficulty === Difficulty.COMPLEX && Math.random() < 0.15; 

                    if (spawnWall) {
                        for (let i = -maxLane; i <= maxLane; i++) {
                            keptObjects.push({
                                id: uuidv4(),
                                type: ObjectType.OBSTACLE,
                                position: [i * LANE_WIDTH, OBSTACLE_HEIGHT / 2, spawnZ],
                                active: true,
                                color: '#ff0000', 
                                variant: 'normal'
                            });
                        }
                    } else if (spawnTower) {
                        const maxLane = Math.floor(laneCount / 2);
                        const allLanes = [];
                        for (let k = -maxLane; k <= maxLane; k++) allLanes.push(k);

                        const patternType = Math.random();

                        // Pattern 1: Funnel / Single Path (Most Dangerous)
                        if (patternType < 0.4) {
                            const safeLaneIndex = Math.floor(Math.random() * allLanes.length);
                            allLanes.forEach((laneIdx, idx) => {
                                if (idx !== safeLaneIndex) {
                                    keptObjects.push({
                                        id: uuidv4(),
                                        type: ObjectType.OBSTACLE,
                                        position: [laneIdx * LANE_WIDTH, OBSTACLE_TALL_HEIGHT / 2, spawnZ],
                                        active: true,
                                        color: '#9900ff',
                                        variant: 'tall'
                                    });
                                }
                            });
                        } 
                        // Pattern 2: Multi-Tower (Side-by-side or Split)
                        else {
                             allLanes.sort(() => Math.random() - 0.5);
                             const countToSpawn = Math.min(2, allLanes.length); 

                             for(let k = 0; k < countToSpawn; k++) {
                                 keptObjects.push({
                                    id: uuidv4(),
                                    type: ObjectType.OBSTACLE,
                                    position: [allLanes[k] * LANE_WIDTH, OBSTACLE_TALL_HEIGHT / 2, spawnZ],
                                    active: true,
                                    color: '#9900ff',
                                    variant: 'tall'
                                });
                             }
                        }
                    } else {
                        const spawnCountBase = Math.floor(laneCount / 2); 
                        const variation = Math.random() > 0.5 ? 1 : 0;
                        let countToSpawn = Math.max(1, spawnCountBase + variation);
                        if (countToSpawn >= availableLanes.length) countToSpawn = availableLanes.length - 1;

                        for (let i = 0; i < countToSpawn; i++) {
                            const lane = availableLanes[i];
                            keptObjects.push({
                                id: uuidv4(),
                                type: ObjectType.OBSTACLE,
                                position: [lane * LANE_WIDTH, OBSTACLE_HEIGHT / 2, spawnZ],
                                active: true,
                                color: '#ff0054',
                                variant: 'normal'
                            });

                            if (Math.random() < 0.3) {
                                keptObjects.push({
                                    id: uuidv4(),
                                    type: ObjectType.GEM,
                                    position: [lane * LANE_WIDTH, OBSTACLE_HEIGHT + 1.0, spawnZ],
                                    active: true,
                                    color: '#ffd700',
                                    points: 100
                                });
                            }
                        }
                    }
                }

            } else {
                const lane = getRandomLane(laneCount);
                keptObjects.push({
                    id: uuidv4(),
                    type: ObjectType.GEM,
                    position: [lane * LANE_WIDTH, 1.2, spawnZ],
                    active: true,
                    color: '#00ffff',
                    points: 50
                });
            }
            hasChanges = true;
         }
    }

    if (hasChanges) {
        objectsRef.current = keptObjects;
        setRenderTrigger(t => t + 1);
    }
  });

  return (
    <group>
      <ParticleSystem />
      {objectsRef.current.map(obj => {
        if (!obj.active) return null;
        return <GameEntity key={obj.id} data={obj} />;
      })}
    </group>
  );
};

// ... [CharSprite component] ...
const CharSprite: React.FC<{ value: string, color: string }> = ({ value, color }) => {
    const texture = useMemo(() => createCharTexture(value, color), [value, color]);
    useEffect(() => {
        return () => { texture.dispose(); };
    }, [texture]);
    
    return (
        <mesh>
            <planeGeometry args={[4.5, 4.5]} />
            <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} alphaTest={0.5} depthWrite={true} />
        </mesh>
    );
}

const GameEntity: React.FC<{ data: GameObject }> = React.memo(({ data }) => {
    const groupRef = useRef<THREE.Group>(null);
    const visualRef = useRef<THREE.Group>(null);
    const shadowRef = useRef<THREE.Mesh>(null);
    const { laneCount } = useStore();
    
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.position.set(data.position[0], 0, data.position[2]);
        }

        if (visualRef.current) {
            const baseHeight = data.position[1];
            if (data.type === ObjectType.SHOP_PORTAL) {
                 visualRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02);
            } else if (data.type === ObjectType.MISSILE) {
                 visualRef.current.rotation.z += delta * 20; 
                 visualRef.current.position.y = baseHeight;
            } else if (data.type === ObjectType.PROJECTILE || data.type === ObjectType.LIGHTNING) {
                 visualRef.current.position.y = baseHeight;
                 visualRef.current.rotation.x += delta * 10;
                 visualRef.current.rotation.y += delta * 10;
            } else if (data.type === ObjectType.ALIEN) {
                 visualRef.current.position.y = baseHeight + Math.sin(state.clock.elapsedTime * 3) * 0.2;
                 visualRef.current.rotation.y += delta;
            } else if (data.type === ObjectType.LETTER) {
                visualRef.current.rotation.set(-0.2, 0, 0); 
                const bobOffset = Math.sin(state.clock.elapsedTime * 4 + data.position[0]) * 0.1;
                visualRef.current.position.y = baseHeight + bobOffset;
            } else if (data.type !== ObjectType.OBSTACLE) {
                visualRef.current.rotation.y += delta * 3;
                const bobOffset = Math.sin(state.clock.elapsedTime * 4 + data.position[0]) * 0.1;
                visualRef.current.position.y = baseHeight + bobOffset;
                if (shadowRef.current) {
                    const shadowScale = 1 - bobOffset; 
                    shadowRef.current.scale.setScalar(shadowScale);
                }
            } else {
                visualRef.current.position.y = baseHeight;
            }
        }
    });

    const shadowGeo = useMemo(() => {
        if (data.type === ObjectType.LETTER) return SHADOW_CHAR_GEO;
        if (data.type === ObjectType.GEM) return SHADOW_GEM_GEO;
        if (data.type === ObjectType.SHOP_PORTAL) return null; 
        if (data.type === ObjectType.ALIEN) return SHADOW_ALIEN_GEO;
        if (data.type === ObjectType.MISSILE) return SHADOW_MISSILE_GEO;
        if (data.type === ObjectType.PROJECTILE || data.type === ObjectType.LIGHTNING) return null; 
        return SHADOW_DEFAULT_GEO; 
    }, [data.type]);

    return (
        <group ref={groupRef} position={[data.position[0], 0, data.position[2]]}>
            {data.type !== ObjectType.SHOP_PORTAL && shadowGeo && (
                <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} geometry={shadowGeo}>
                    <meshBasicMaterial color="#000000" opacity={0.3} transparent />
                </mesh>
            )}

            <group ref={visualRef} position={[0, data.position[1], 0]}>
                {/* SHOP PORTAL */}
                {data.type === ObjectType.SHOP_PORTAL && (
                    <group>
                         <mesh position={[0, 3, 0]} geometry={SHOP_FRAME_GEO} scale={[laneCount * LANE_WIDTH + 2, 1, 1]}>
                             <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
                         </mesh>
                         <mesh position={[0, 2, 0]} geometry={SHOP_BACK_GEO} scale={[laneCount * LANE_WIDTH, 1, 1]}>
                              <meshBasicMaterial color="#000000" />
                         </mesh>
                         <mesh position={[0, 3, 0]} geometry={SHOP_OUTLINE_GEO} scale={[laneCount * LANE_WIDTH + 2.2, 1, 1]}>
                             <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
                         </mesh>
                         <Center position={[0, 5, 0.6]}>
                             <Text fontSize={1.2} color="#ffff00" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#ff0000">CYBER SHOP</Text>
                         </Center>
                         <mesh position={[0, 0.1, 0]} rotation={[-Math.PI/2, 0, 0]} geometry={SHOP_FLOOR_GEO} scale={[laneCount * LANE_WIDTH, 1, 1]}>
                             <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
                         </mesh>
                    </group>
                )}

                {/* OBSTACLE */}
                {data.type === ObjectType.OBSTACLE && (
                    <group>
                        {data.variant === 'tall' ? (
                             <>
                                 <mesh geometry={OBSTACLE_TALL_GEOMETRY} castShadow receiveShadow>
                                     <meshStandardMaterial color="#2a0033" roughness={0.3} metalness={0.9} />
                                 </mesh>
                                 <mesh scale={[1.02, 1.02, 1.02]} geometry={OBSTACLE_TALL_GLOW_GEO}>
                                     <meshBasicMaterial color={data.color} wireframe transparent opacity={0.5} />
                                 </mesh>
                             </>
                        ) : (
                             <>
                                 <mesh geometry={OBSTACLE_GEOMETRY} castShadow receiveShadow>
                                     <meshStandardMaterial color="#330011" roughness={0.3} metalness={0.8} flatShading={true} />
                                 </mesh>
                                 <mesh scale={[1.02, 1.02, 1.02]} geometry={OBSTACLE_GLOW_GEO}>
                                     <meshBasicMaterial color={data.color} wireframe transparent opacity={0.3} />
                                 </mesh>
                                 <mesh position={[0, -OBSTACLE_HEIGHT/2 + 0.05, 0]} rotation={[-Math.PI/2,0,0]} geometry={OBSTACLE_RING_GEO}>
                                     <meshBasicMaterial color={data.color} transparent opacity={0.4} side={THREE.DoubleSide} />
                                 </mesh>
                             </>
                        )}
                    </group>
                )}

                {/* ALIEN */}
                {data.type === ObjectType.ALIEN && (
                    <group>
                        <mesh castShadow geometry={ALIEN_BODY_GEO}>
                            <meshStandardMaterial color="#4400cc" metalness={0.8} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0.2, 0]} geometry={ALIEN_DOME_GEO}>
                            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} transparent opacity={0.8} />
                        </mesh>
                        <mesh position={[0.3, 0, 0.3]} geometry={ALIEN_EYE_GEO}><meshBasicMaterial color="#ff00ff" /></mesh>
                        <mesh position={[-0.3, 0, 0.3]} geometry={ALIEN_EYE_GEO}><meshBasicMaterial color="#ff00ff" /></mesh>
                    </group>
                )}

                {/* MISSILE */}
                {data.type === ObjectType.MISSILE && (
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh geometry={MISSILE_CORE_GEO}><meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={4} /></mesh>
                        <mesh position={[0, 1.0, 0]} geometry={MISSILE_RING_GEO}><meshBasicMaterial color="#ffff00" /></mesh>
                        <mesh position={[0, 0, 0]} geometry={MISSILE_RING_GEO}><meshBasicMaterial color="#ffff00" /></mesh>
                        <mesh position={[0, -1.0, 0]} geometry={MISSILE_RING_GEO}><meshBasicMaterial color="#ffff00" /></mesh>
                    </group>
                )}
                
                {/* PROJECTILE */}
                {data.type === ObjectType.PROJECTILE && <mesh geometry={PROJECTILE_GEO}><meshBasicMaterial color="#ff5500" /></mesh>}

                {/* LIGHTNING */}
                {data.type === ObjectType.LIGHTNING && (
                    <mesh geometry={LIGHTNING_GEO} rotation={[Math.PI/2, 0, 0]}>
                        <meshBasicMaterial color="#ffff00" />
                    </mesh>
                )}

                {/* GEM */}
                {data.type === ObjectType.GEM && <mesh castShadow geometry={GEM_GEOMETRY}><meshStandardMaterial color={data.color} roughness={0} metalness={1} emissive={data.color} emissiveIntensity={2} /></mesh>}

                {/* CHINESE CHAR */}
                {data.type === ObjectType.LETTER && data.value && <CharSprite value={data.value} color={data.color || '#fff'} />}
            </group>
        </group>
    );
});
