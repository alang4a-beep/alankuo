
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  SHOP = 'SHOP',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export enum ObjectType {
  OBSTACLE = 'OBSTACLE',
  GEM = 'GEM',
  LETTER = 'LETTER',
  SHOP_PORTAL = 'SHOP_PORTAL',
  ALIEN = 'ALIEN',
  MISSILE = 'MISSILE',
  PROJECTILE = 'PROJECTILE',
  LIGHTNING = 'LIGHTNING'
}

export enum Difficulty {
  SIMPLE = 'SIMPLE',
  COMPLEX = 'COMPLEX'
}

export enum PetID {
  NONE = 'NONE',
  MARIO = 'MARIO', // Collects coins in lane + Double points
  PIKACHU = 'PIKACHU', // Shoots lightning
  MECHA = 'MECHA' // Prevents damage from wrong answers
}

export interface VocabItem {
    char: string;
    question: string; // e.g., "保 ( ? ) 護"
    pinyin?: string;  // Optional phonetic help
}

export interface WrongAnswer {
    question: string;
    correctChar: string;
    playerChar: string; // What they picked (if we track specific pick, otherwise just mark as missed)
}

export interface GameObject {
  id: string;
  type: ObjectType;
  position: [number, number, number]; // x, y, z
  active: boolean;
  value?: string; // For letters/characters
  color?: string;
  isTarget?: boolean; // If this object is the correct answer
  points?: number; // Score value for gems
  hasFired?: boolean; // For Aliens
  variant?: 'normal' | 'tall'; // For obstacle variations
}

export const LANE_WIDTH = 2.2;
export const JUMP_HEIGHT = 2.5;
export const JUMP_DURATION = 0.6; // seconds
export const RUN_SPEED_BASE = 22.5;
export const SPAWN_DISTANCE = 120;
export const REMOVE_DISTANCE = 20; // Behind player

// Neon Palette for Chinese Characters
export const NEON_COLORS = [
    '#2979ff', // Blue
    '#ff1744', // Red
    '#ffea00', // Yellow
    '#00e676', // Green
    '#d500f9', // Purple
    '#00e5ff', // Cyan
];

export interface ShopItem {
    id: string;
    name: string;
    description: string;
    cost: number;
    icon: any; // Lucide icon component
    oneTime?: boolean; // If true, remove from pool after buying
    petId?: PetID; // If this item unlocks a pet
}

// Global JSX Augmentation for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Objects
      group: any;
      mesh: any;
      points: any;
      instancedMesh: any;
      primitive: any;

      // Geometries
      bufferGeometry: any;
      planeGeometry: any;
      boxGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      coneGeometry: any;
      ringGeometry: any;
      torusGeometry: any;
      circleGeometry: any;
      octahedronGeometry: any;
      icosahedronGeometry: any;

      // Materials
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      pointsMaterial: any;
      shaderMaterial: any;

      // Lights & Environment
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      fog: any;
      
      // Utils
      bufferAttribute: any;
      color: any;

      // Catch-all to allow standard HTML elements
      [elemName: string]: any;
    }
  }
}