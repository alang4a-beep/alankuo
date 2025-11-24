
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
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
  SUPER_SIMPLE = 'SUPER_SIMPLE', // No damage
  SIMPLE = 'SIMPLE',
  COMPLEX = 'COMPLEX'
}

export enum PetID {
  NONE = 'NONE',
  MARIO = 'MARIO', // Collects coins in lane + Double points
  PIKACHU = 'PIKACHU', // Shoots lightning
  MECHA = 'MECHA' // Prevents damage from wrong answers
}

export enum ThemeID {
  SYNTHWAVE = 'THEME_SYNTHWAVE',
  INFERNO = 'THEME_INFERNO',
  GLACIER = 'THEME_GLACIER',
  TOXIC = 'THEME_TOXIC'
}

export const THEME_CONFIG: Record<ThemeID, {
    background: string;
    fog: string;
    grid: string;
    floor: string; // New distinct floor color
    sunTop: string;
    sunBottom: string;
    lightDir: string;
    lightAmbient: string;
    lightPoint: string;
}> = {
    [ThemeID.SYNTHWAVE]: {
        background: '#050011', // Very dark blue/black
        fog: '#050011',
        grid: '#d500f9',       // Bright neon purple grid
        floor: '#120024',      // Solid dark purple floor (Contrast against bg)
        sunTop: '#ffe600',
        sunBottom: '#ff0077',
        lightDir: '#00ffff',
        lightAmbient: '#400080',
        lightPoint: '#ff00aa'
    },
    [ThemeID.INFERNO]: {
        background: '#1a0000', // Pitch black/red
        fog: '#1a0000',
        grid: '#ff9100',       // Bright Orange grid
        floor: '#3d0000',      // Dark solidified lava floor
        sunTop: '#ffff00', 
        sunBottom: '#ff0000', 
        lightDir: '#ffaa00', 
        lightAmbient: '#400000',
        lightPoint: '#ff5500'
    },
    [ThemeID.GLACIER]: {
        background: '#000814', // Darkest Navy
        fog: '#000814',
        grid: '#00ffff',       // Cyan grid
        floor: '#001e3d',      // Deep blue ice floor
        sunTop: '#ffffff', 
        sunBottom: '#0088ff', 
        lightDir: '#ffffff',
        lightAmbient: '#002244',
        lightPoint: '#00ffff'
    },
    [ThemeID.TOXIC]: {
        background: '#050a00', // Darkest Green/Black
        fog: '#050a00',
        grid: '#39ff14',       // Neon Green grid
        floor: '#0f2900',      // Dark slime floor
        sunTop: '#ccff00', 
        sunBottom: '#004400', 
        lightDir: '#adff2f', 
        lightAmbient: '#003300',
        lightPoint: '#00ff00'
    }
};

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
    themeId?: ThemeID; // If this item unlocks a theme
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
