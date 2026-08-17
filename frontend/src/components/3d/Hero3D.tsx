'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Move3D, Sparkles, ImageIcon, RotateCw } from 'lucide-react';

// Advanced Architectural Modern Villa Model matching user reference (Image 1)
function LuxuryArchitecturalVilla({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mainGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mainGroupRef.current) {
      const t = state.clock.getElapsedTime();
      // Smooth slow auto-rotation combined with subtle mouse tracking
      mainGroupRef.current.rotation.y = t * 0.15 + mouse.current.x * 0.22;
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        mouse.current.y * 0.07,
        0.05
      );
    }
  });

  // Materials matching architectural luxury villa
  const whiteFacadeMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.12,
    metalness: 0.04,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#b3e5fc'),
    transparent: true,
    opacity: 0.5,
    roughness: 0.05,
    transmission: 0.85,
    thickness: 0.4,
    ior: 1.5,
  });

  const darkFrameMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e293b'),
    roughness: 0.3,
    metalness: 0.8,
  });

  const grassLawnMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#43a047'),
    roughness: 0.75,
  });

  const basePlatformMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f1f5f9'),
    roughness: 0.35,
    metalness: 0.05,
  });

  return (
    <group ref={mainGroupRef} position={[0, -0.65, 0]} scale={1.08}>
      {/* ================= BASE ISLAND & LANDSCAPING ================= */}
      {/* Outer White Raised Ring Platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3.7, 3.9, 0.2, 64]} />
        <primitive object={basePlatformMat} attach="material" />
      </mesh>

      {/* Inner Green Lawn Disc */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[3.55, 3.55, 0.02, 64]} />
        <primitive object={grassLawnMat} attach="material" />
      </mesh>

      {/* Front Curved Pathway / Entry Steps */}
      {[0, 1, 2, 3].map((step) => (
        <mesh
          key={step}
          position={[0, 0.03 + step * 0.04, 2.1 + step * 0.22]}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[1.5 - step * 0.15, 0.04, 0.22]} />
          <primitive object={whiteFacadeMat} attach="material" />
        </mesh>
      ))}

      {/* Pine / Coniferous Trees (Left Side Cluster) */}
      {[
        [-2.3, 0, 0.8, 1.1],
        [-2.6, 0, -0.3, 0.95],
        [-2.0, 0, -1.2, 1.05],
        [-1.5, 0, -2.0, 0.85],
      ].map(([x, y, z, scale], i) => (
        <group key={`tree-left-${i}`} position={[x, y, z]} scale={scale}>
          {/* Trunk */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#5c4033" roughness={0.9} />
          </mesh>
          {/* Cone Pine Layers */}
          <mesh position={[0, 0.65, 0]} castShadow>
            <coneGeometry args={[0.4, 0.6, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#2e7d32' : '#1b5e20'} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.95, 0]} castShadow>
            <coneGeometry args={[0.3, 0.5, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#388e3c' : '#2e7d32'} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Pine / Coniferous Trees (Right Side Cluster) */}
      {[
        [2.3, 0, 0.7, 1.0],
        [2.6, 0, -0.4, 0.9],
        [1.9, 0, -1.4, 0.85],
      ].map(([x, y, z, scale], i) => (
        <group key={`tree-right-${i}`} position={[x, y, z]} scale={scale}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#5c4033" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.65, 0]} castShadow>
            <coneGeometry args={[0.38, 0.6, 12]} />
            <meshStandardMaterial color="#2e7d32" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.95, 0]} castShadow>
            <coneGeometry args={[0.28, 0.5, 12]} />
            <meshStandardMaterial color="#388e3c" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Decorative Garden Boulders / Stones */}
      {[
        [-1.6, 0.05, 1.7, 0.16],
        [-1.3, 0.04, 2.0, 0.12],
        [1.7, 0.05, 1.6, 0.18],
      ].map(([x, y, z, r], i) => (
        <mesh key={`rock-${i}`} position={[x, y, z]}>
          <dodecahedronGeometry args={[r, 1]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
      ))}

      {/* ================= VILLA ARCHITECTURE ================= */}
      <group>
        {/* --- GROUND FLOOR --- */}
        {/* Ground Floor Slab Base */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.0, 2.1, 0.12, 64]} />
          <primitive object={whiteFacadeMat} attach="material" />
        </mesh>

        {/* Ground Floor Core Living Space */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.85, 1.9, 1.0, 64]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Ground Floor Glass Wall */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[1.92, 1.92, 0.98, 64, 1, true]} />
          <primitive object={glassMat} attach="material" />
        </mesh>

        {/* Structural Steel Pillars */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={`pillar-${i}`}
              position={[Math.sin(rad) * 1.93, 0.65, Math.cos(rad) * 1.93]}
            >
              <boxGeometry args={[0.05, 1.0, 0.05]} />
              <primitive object={darkFrameMat} attach="material" />
            </mesh>
          );
        })}

        {/* Interior Warm Light Glow */}
        <pointLight position={[0, 0.7, 0]} intensity={4.0} color="#ffeaa7" distance={6} />
        <pointLight position={[0.8, 0.6, 0.8]} intensity={2.2} color="#ffd166" distance={4} />

        {/* --- FIRST FLOOR / CANTILEVER TERRACE --- */}
        {/* Cantilever Floor Overhang Slab */}
        <mesh position={[0.15, 1.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.15, 2.15, 0.15, 64]} />
          <primitive object={whiteFacadeMat} attach="material" />
        </mesh>

        {/* Glass Railing around Terrace */}
        <mesh position={[0.15, 1.45, 0]}>
          <cylinderGeometry args={[2.14, 2.14, 0.25, 64, 1, true]} />
          <primitive object={glassMat} attach="material" />
        </mesh>

        {/* Railing Chrome Cap Rim */}
        <mesh position={[0.15, 1.58, 0]}>
          <torusGeometry args={[2.14, 0.015, 16, 64]} />
          <primitive object={darkFrameMat} attach="material" />
        </mesh>

        {/* Upper Level Core */}
        <mesh position={[0.1, 1.75, -0.1]} castShadow receiveShadow>
          <cylinderGeometry args={[1.7, 1.75, 0.85, 64]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>

        {/* Upper Floor Glass Wall */}
        <mesh position={[0.1, 1.75, -0.1]}>
          <cylinderGeometry args={[1.73, 1.73, 0.83, 64, 1, true]} />
          <primitive object={glassMat} attach="material" />
        </mesh>

        {/* Upper Floor Light Glow */}
        <pointLight position={[0.1, 1.8, -0.1]} intensity={3.5} color="#fff4cc" distance={5} />

        {/* --- ROOF CANOPY & CANTILEVER TOP --- */}
        {/* Roof Overhang Slab */}
        <mesh position={[0.05, 2.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.25, 2.05, 0.15, 64]} />
          <primitive object={whiteFacadeMat} attach="material" />
        </mesh>

        {/* Roof Sunroof Deck */}
        <mesh position={[0.05, 2.34, 0]} receiveShadow>
          <cylinderGeometry args={[1.8, 1.8, 0.03, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} />
        </mesh>

        {/* Roof Garden Accents */}
        <mesh position={[-0.5, 2.4, 0.3]}>
          <boxGeometry args={[0.6, 0.1, 0.3]} />
          <meshStandardMaterial color="#388e3c" />
        </mesh>
        <mesh position={[0.4, 2.4, -0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.5]} />
          <meshStandardMaterial color="#2e7d32" />
        </mesh>
      </group>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full flex items-center justify-center pointer-events-none">
      <img
        src="/images/hero_luxury_villa_3d.png"
        alt="Modern Architectural Villa 3D Render"
        className="w-full h-auto max-w-3xl object-contain mix-blend-multiply filter drop-shadow-xl"
      />
    </div>
  );
}

