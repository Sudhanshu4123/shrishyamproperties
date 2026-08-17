'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { X, RotateCcw, Layers } from 'lucide-react';

interface PropertyViewer3DProps {
  propertyTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Interior Floor Model
function FloorPlan3DModel({ activeFloor }: { activeFloor: number }) {
  const modelGroup = useRef<THREE.Group>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (modelGroup.current) {
      // Gentle floating animation for active floor level
      modelGroup.current.position.y = THREE.MathUtils.lerp(
        modelGroup.current.position.y,
        activeFloor * 0.4,
        0.08
      );
    }
  });

  return (
    <group ref={modelGroup} position={[0, 0, 0]}>
      {/* Floor Base Slab */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[5, 0.2, 4]} />
        <meshStandardMaterial color="#1e2433" roughness={0.3} />
      </mesh>

      {/* Exterior & Interior Wall Partition Grid */}
      <group>
        {/* Outer Perimeter Walls */}
        <mesh position={[0, 0.4, -1.95]}>
          <boxGeometry args={[4.9, 0.8, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[-2.45, 0.4, 0]}>
          <boxGeometry args={[0.1, 0.8, 4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[2.45, 0.4, 0]}>
          <boxGeometry args={[0.1, 0.8, 4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Room Dividers */}
        <mesh position={[-0.5, 0.4, 0]}>
          <boxGeometry args={[0.1, 0.8, 2.5]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[1.0, 0.4, 0.8]}>
          <boxGeometry args={[2.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Italian Marble Living Lounge Flooring */}
      <mesh position={[-1.2, 0.01, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 2.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Master Bedroom Wooden Flooring */}
      <mesh position={[1.0, 0.01, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 2.4]} />
        <meshStandardMaterial color="#78350f" roughness={0.6} />
      </mesh>

      {/* Modular Kitchen Flooring */}
      <mesh position={[-1.2, 0.01, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 1.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* Balcony Deck */}
      <mesh position={[1.0, 0.01, 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 1.0]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
      </mesh>

      {/* Hotspot Markers */}
      {/* 1. Living Lounge Hotspot */}
      <Html position={[-1.2, 0.8, -0.6]} center>
        <div className="relative group">
          <button
            onClick={() => setActiveHotspot(activeHotspot === 'lounge' ? null : 'lounge')}
            className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
          >
            1
          </button>
          {activeHotspot === 'lounge' && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 glass-panel-gold rounded-xl text-xs shadow-2xl z-50 text-white">
              <h4 className="font-bold text-amber-400">Grand Living Lounge</h4>
              <p className="text-slate-300 mt-1 text-[11px]">Italian marble, floor-to-ceiling double glazed windows with park view.</p>
            </div>
          )}
        </div>
      </Html>

      {/* 2. Master Suite Hotspot */}
      <Html position={[1.0, 0.8, -0.6]} center>
        <div className="relative group">
          <button
            onClick={() => setActiveHotspot(activeHotspot === 'bedroom' ? null : 'bedroom')}
            className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
          >
            2
          </button>
          {activeHotspot === 'bedroom' && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 glass-panel-gold rounded-xl text-xs shadow-2xl z-50 text-white">
              <h4 className="font-bold text-amber-400">Master Bedroom</h4>
              <p className="text-slate-300 mt-1 text-[11px]">Wooden laminated floor, walk-in closet, attached luxury bath.</p>
            </div>
          )}
        </div>
      </Html>

      {/* 3. Modular Kitchen Hotspot */}
      <Html position={[-1.2, 0.8, 1.1]} center>
        <div className="relative group">
          <button
            onClick={() => setActiveHotspot(activeHotspot === 'kitchen' ? null : 'kitchen')}
            className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
          >
            3
          </button>
          {activeHotspot === 'kitchen' && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 glass-panel-gold rounded-xl text-xs shadow-2xl z-50 text-white">
              <h4 className="font-bold text-amber-400">German Modular Kitchen</h4>
              <p className="text-slate-300 mt-1 text-[11px]">Hafele soft-close hardware, quartz countertop & IGL gas pipeline.</p>
            </div>
          )}
        </div>
      </Html>

      {/* 4. Balcony View Hotspot */}
      <Html position={[1.0, 0.8, 1.4]} center>
        <div className="relative group">
          <button
            onClick={() => setActiveHotspot(activeHotspot === 'balcony' ? null : 'balcony')}
            className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
          >
            4
          </button>
          {activeHotspot === 'balcony' && (
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 glass-panel-gold rounded-xl text-xs shadow-2xl z-50 text-white">
              <h4 className="font-bold text-amber-400">Park Facing Balcony</h4>
              <p className="text-slate-300 mt-1 text-[11px]">6ft deep wide balcony deck with glass railing & greenery views.</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

export default function PropertyViewer3D({ propertyTitle = '3 BHK Luxury Property', isOpen, onClose }: PropertyViewer3DProps) {
  const [activeFloor, setActiveFloor] = useState(1);
  const controlsRef = useRef<any>(null);

  if (!isOpen) return null;

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-30 glass-panel border-b border-amber-500/20">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">3D Interactive Architectural Inspection</span>
          <h2 className="text-base sm:text-xl font-bold text-white truncate max-w-md">{propertyTitle}</h2>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-amber-400 hover:bg-slate-800 border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full pt-20 pb-24 px-4">
        <Canvas shadows className="w-full h-full cursor-grab active:cursor-grabbing">
          <PerspectiveCamera makeDefault position={[6, 6, 7]} fov={45} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow color="#fff3d1" />
          <pointLight position={[-5, 5, -5]} intensity={0.6} color="#93c5fd" />

          <FloorPlan3DModel activeFloor={activeFloor} />

          <OrbitControls ref={controlsRef} minDistance={3} maxDistance={15} maxPolarAngle={Math.PI / 2.05} />
        </Canvas>
      </div>

      {/* Floor Level Switcher (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-30 flex flex-col gap-2 glass-panel p-3 rounded-2xl border border-amber-500/20">
        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1 px-1">
          <Layers className="w-4 h-4" />
          <span>Select Floor Level</span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { level: 0, label: 'Ground' },
            { level: 1, label: '1st Floor' },
            { level: 2, label: '2nd Floor' },
            { level: 3, label: 'Terrace' }
          ].map(f => (
            <button
              key={f.level}
              onClick={() => setActiveFloor(f.level)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeFloor === f.level
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 glass-panel p-2 rounded-2xl border border-amber-500/20">
        <button
          onClick={handleResetCamera}
          title="Reset View"
          className="p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 rounded-xl transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
