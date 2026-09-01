'use client';

import React from 'react';
import Image from 'next/image';

export default function Hero3D() {
  return (
    <div className="w-full flex items-center justify-center pointer-events-none relative min-h-[220px] sm:min-h-[300px] md:min-h-[360px]">
      <Image
        src="/images/hero_luxury_villa_3d.png"
        alt="Modern Luxury Villa Architecture in Dwarka"
        width={800}
        height={380}
        priority
        fetchPriority="high"
        sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 800px"
        className="w-full h-auto max-w-3xl object-contain mix-blend-multiply filter drop-shadow-xl"
      />
    </div>
  );
}
