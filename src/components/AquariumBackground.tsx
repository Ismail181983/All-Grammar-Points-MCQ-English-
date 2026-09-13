import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FishConfig {
  id: number;
  type: 'clownfish' | 'bluetang' | 'angelfish' | 'goldfish' | 'neontetra' | 'purplediscus';
  startX: number; // in percentage
  y: number; // percentage from top
  size: number;
  duration: number;
  delay: number;
  direction: 'left-to-right' | 'right-to-left';
  speedYOffset: number;
}

interface FlowerConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  delay: number;
}

interface BubbleConfig {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

interface AquariumBackgroundProps {
  fishCount?: number;
  flowerCount?: number;
  showOverlay?: boolean;
}

export const AquariumBackground: React.FC<AquariumBackgroundProps> = ({
  fishCount = 12,
  flowerCount = 8,
  showOverlay = true,
}) => {
  // Generate fishes
  const fishes: FishConfig[] = useMemo(() => {
    const types: FishConfig['type'][] = [
      'clownfish',
      'bluetang',
      'angelfish',
      'goldfish',
      'neontetra',
      'purplediscus',
    ];
    return Array.from({ length: fishCount }).map((_, i) => {
      const direction: 'left-to-right' | 'right-to-left' = i % 2 === 0 ? 'left-to-right' : 'right-to-left';
      return {
        id: i,
        type: types[i % types.length],
        startX: (i * 18) % 100,
        y: 8 + (i * 7.5) % 80,
        size: 42 + ((i * 11) % 40),
        duration: 16 + ((i * 5) % 18),
        delay: (i * 1.8) % 12,
        direction,
        speedYOffset: 12 + ((i * 4) % 18),
      };
    });
  }, [fishCount]);

  // Generate floating water flowers / lilies
  const flowers: FlowerConfig[] = useMemo(() => {
    const colors = [
      '#f43f5e', // rose
      '#ec4899', // pink
      '#a855f7', // purple
      '#eab308', // golden
      '#06b6d4', // cyan-blue lotus
      '#fb7185', // soft coral
      '#f97316', // orange blossom
    ];
    return Array.from({ length: flowerCount }).map((_, i) => ({
      id: i,
      x: 5 + (i * 12.5) % 90,
      y: 4 + (i * 3.5) % 25, // top surface water area
      size: 44 + ((i * 7) % 36),
      rotation: (i * 45) % 360,
      color: colors[i % colors.length],
      delay: (i * 1.2) % 6,
    }));
  }, [flowerCount]);

  // Generate rising bubbles
  const bubbles: BubbleConfig[] = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: 3 + (i * 4.6) % 94,
      size: 6 + ((i * 5) % 16),
      duration: 7 + ((i * 3) % 9),
      delay: (i * 0.9) % 8,
    }));
  }, []);

  return (
    <div
      id="aquarium-container"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0d9488 0%, #0284c7 35%, #0f172a 90%, #020617 100%)',
      }}
    >
      {/* Sunlight rays caustics effect */}
      <div
        className="absolute inset-x-0 top-0 h-96 opacity-35"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(56,189,248,0.2) 50%, transparent 100%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Surface water shimmer */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-cyan-300/30 via-teal-200/15 to-transparent backdrop-blur-[1px]" />

      {/* Floating Flowers / Lilies on surface */}
      {flowers.map((fl) => (
        <motion.div
          key={`flower-${fl.id}`}
          className="absolute"
          style={{
            left: `${fl.x}%`,
            top: `${fl.y}%`,
            width: fl.size,
            height: fl.size,
          }}
          animate={{
            y: [-6, 8, -6],
            rotate: [fl.rotation - 8, fl.rotation + 8, fl.rotation - 8],
          }}
          transition={{
            duration: 6 + (fl.id % 4),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: fl.delay,
          }}
        >
          {/* Lily pad underneath */}
          <div
            className="absolute -inset-2 rounded-full bg-emerald-700/60 border border-emerald-400/40 shadow-md"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)',
            }}
          />
          {/* Flower SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg relative z-10">
            {/* Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
              <path
                key={idx}
                d="M50 50 C40 20, 60 20, 50 5 C40 20, 60 20, 50 50"
                fill={fl.color}
                opacity="0.9"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Inner layered petals */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg, idx) => (
              <path
                key={`inner-${idx}`}
                d="M50 50 C43 28, 57 28, 50 18 C43 28, 57 28, 50 50"
                fill="#fef08a"
                opacity="0.95"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* Flower Center */}
            <circle cx="50" cy="50" r="11" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <circle cx="50" cy="50" r="5" fill="#f59e0b" />
          </svg>
        </motion.div>
      ))}

      {/* Floating Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={`bubble-${b.id}`}
          className="absolute rounded-full border border-cyan-200/50 bg-cyan-100/20 backdrop-blur-[1px] shadow-[0_0_8px_rgba(34,211,238,0.4)]"
          style={{
            left: `${b.x}%`,
            bottom: '-30px',
            width: b.size,
            height: b.size,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (b.id % 2 === 0 ? 25 : -25), 0],
            opacity: [0, 0.85, 0.9, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: b.delay,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 ml-1 mt-1" />
        </motion.div>
      ))}

      {/* Swimming Animated Fishes */}
      {fishes.map((f) => {
        const isLTR = f.direction === 'left-to-right';
        return (
          <motion.div
            key={`fish-${f.id}`}
            className="absolute z-10 drop-shadow-xl"
            style={{
              top: `${f.y}%`,
              width: f.size * 1.5,
              height: f.size,
            }}
            initial={{
              x: isLTR ? '-20vw' : '120vw',
            }}
            animate={{
              x: isLTR ? ['-20vw', '120vw'] : ['120vw', '-20vw'],
              y: [0, -f.speedYOffset, f.speedYOffset, 0],
            }}
            transition={{
              x: {
                duration: f.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: f.delay,
              },
              y: {
                duration: 3.5 + (f.id % 3),
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <div
              style={{
                transform: isLTR ? 'scaleX(1)' : 'scaleX(-1)',
                width: '100%',
                height: '100%',
              }}
            >
              {renderFishSvg(f.type)}
            </div>
          </motion.div>
        );
      })}

      {/* Sea Floor Corals and Aquatic Plants */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-10 flex items-end justify-between px-3 opacity-90">
        {/* Repeating swaying seaweeds */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={`seaweed-${i}`}
            className="origin-bottom"
            animate={{
              rotate: [-(i % 3 + 4), i % 3 + 4, -(i % 3 + 4)],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i * 0.3) % 2,
            }}
          >
            <svg
              width={26 + (i % 4) * 8}
              height={100 + (i % 5) * 22}
              viewBox="0 0 40 140"
              fill="none"
              className="drop-shadow-md"
            >
              <path
                d="M20 140 C10 100, 30 70, 15 40 C5 20, 25 10, 20 0 C15 10, 35 20, 25 40 C10 70, 30 100, 20 140 Z"
                fill={i % 2 === 0 ? '#10b981' : '#059669'}
                opacity={0.8}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Colorful Corals at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-10 flex items-end justify-around px-8">
        <CoralCluster color="#f43f5e" size={60} />
        <CoralCluster color="#fb923c" size={75} />
        <CoralCluster color="#a855f7" size={55} />
        <CoralCluster color="#06b6d4" size={70} />
        <CoralCluster color="#eab308" size={65} />
        <CoralCluster color="#ec4899" size={72} />
      </div>

      {/* Soft Vignette Overlay for readability */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/40 to-slate-950/70 backdrop-blur-[0.5px]" />
      )}
    </div>
  );
};

function CoralCluster({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} opacity="0.85">
      <path d="M50 100 C35 80, 20 60, 20 35 C20 15, 35 25, 42 40 C45 25, 55 15, 60 30 C65 20, 78 18, 80 40 C82 60, 65 80, 50 100 Z" />
      <circle cx="28" cy="22" r="6" fill={color} />
      <circle cx="58" cy="16" r="7" fill={color} />
      <circle cx="78" cy="24" r="6" fill={color} />
    </svg>
  );
}

function renderFishSvg(type: FishConfig['type']) {
  switch (type) {
    case 'clownfish':
      // Vibrant Orange Clownfish with White stripes & black trims
      return (
        <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-lg">
          {/* Tail fin */}
          <path d="M22 35 L5 12 Q0 35 5 58 Z" fill="#ea580c" stroke="#1c1917" strokeWidth="1.5" />
          <path d="M12 20 Q8 35 12 50" stroke="#f8fafc" strokeWidth="2.5" fill="none" />
          {/* Dorsal & Ventral Fins */}
          <path d="M50 15 Q65 2 80 15 Z" fill="#f97316" stroke="#1c1917" strokeWidth="1.5" />
          <path d="M55 52 Q68 66 80 50 Z" fill="#f97316" stroke="#1c1917" strokeWidth="1.5" />
          {/* Fish Body */}
          <ellipse cx="65" cy="35" rx="42" ry="22" fill="#f97316" />
          {/* White vertical stripes */}
          <path d="M55 14 Q60 35 55 56" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />
          <path d="M55 14 Q60 35 55 56" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          <path d="M78 16 Q82 35 78 54" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <path d="M78 16 Q82 35 78 54" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          {/* Eye */}
          <circle cx="95" cy="30" r="5.5" fill="#ffffff" />
          <circle cx="96" cy="30" r="3.2" fill="#0f172a" />
          <circle cx="97" cy="28.5" r="1.2" fill="#ffffff" />
          {/* Pectoral Fin */}
          <ellipse cx="70" cy="38" rx="10" ry="6" fill="#fb923c" stroke="#1c1917" strokeWidth="1" transform="rotate(20 70 38)" />
        </svg>
      );

    case 'bluetang':
      // Regal Blue Tang (Dory style) - Royal blue with neon yellow tail
      return (
        <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-lg">
          {/* Tail */}
          <path d="M25 35 L4 10 Q12 35 4 60 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Body */}
          <ellipse cx="66" cy="35" rx="44" ry="24" fill="#1d4ed8" />
          {/* Black distinct pattern */}
          <path d="M40 22 C60 12, 85 24, 75 38 C65 52, 45 40, 30 35 Z" fill="#0f172a" />
          {/* Yellow wedge near tail */}
          <path d="M25 35 L48 24 L48 46 Z" fill="#facc15" />
          {/* Eye */}
          <circle cx="94" cy="28" r="5.5" fill="#fef08a" />
          <circle cx="95" cy="28" r="3" fill="#020617" />
          <circle cx="96" cy="27" r="1" fill="#ffffff" />
          {/* Dorsal & pelvic blue trims */}
          <path d="M45 12 Q75 6 95 20" stroke="#60a5fa" strokeWidth="3" fill="none" />
        </svg>
      );

    case 'angelfish':
      // Graceful high-finned Angelfish with purple/emerald stripes
      return (
        <svg viewBox="0 0 120 85" className="w-full h-full drop-shadow-lg">
          {/* Tall Dorsal Fin */}
          <path d="M45 35 L20 2 Q55 10 65 32 Z" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
          {/* Long Ventral Fin */}
          <path d="M45 45 L18 82 Q55 70 65 48 Z" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />
          {/* Body */}
          <path d="M30 40 L60 15 L95 40 L60 65 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          {/* Tail */}
          <path d="M30 40 L5 25 L12 40 L5 55 Z" fill="#34d399" />
          {/* Stripes */}
          <line x1="50" y1="23" x2="50" y2="57" stroke="#4c1d95" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="72" y1="24" x2="72" y2="56" stroke="#4c1d95" strokeWidth="3.5" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="86" cy="37" r="5" fill="#ffffff" />
          <circle cx="87" cy="37" r="3" fill="#b91c1c" />
          <circle cx="87.5" cy="36" r="1" fill="#ffffff" />
        </svg>
      );

    case 'goldfish':
      // Golden Fancy Guppy / Goldfish with wavy translucent tail
      return (
        <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-lg">
          {/* Large wavy caudal tail */}
          <path d="M35 35 C15 5, -5 20, 2 38 C-5 55, 15 65, 35 35 Z" fill="#f59e0b" opacity="0.9" />
          <path d="M30 35 C10 15, 0 25, 8 36 C0 48, 10 55, 30 35 Z" fill="#ef4444" opacity="0.8" />
          {/* Body */}
          <ellipse cx="68" cy="35" rx="36" ry="20" fill="#f59e0b" />
          <ellipse cx="68" cy="35" rx="30" ry="16" fill="#fbbf24" />
          {/* Top fin */}
          <path d="M50 16 Q65 6 82 17" stroke="#ea580c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="92" cy="30" r="5.5" fill="#ffffff" />
          <circle cx="93" cy="30" r="3.2" fill="#1c1917" />
          <circle cx="94" cy="28.5" r="1.2" fill="#ffffff" />
        </svg>
      );

    case 'neontetra':
      // Electric Neon Tetra with luminous cyan & crimson stripes
      return (
        <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-lg">
          {/* Tail */}
          <path d="M22 30 L5 15 Q12 30 5 45 Z" fill="#94a3b8" opacity="0.75" />
          {/* Body */}
          <ellipse cx="62" cy="30" rx="42" ry="15" fill="#334155" />
          {/* Electric Cyan Neon Stripe */}
          <path d="M30 27 L95 27" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" className="drop-shadow-[0_0_6px_#22d3ee]" />
          {/* Crimson Red Lower Half */}
          <path d="M28 35 L65 35" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" className="drop-shadow-[0_0_6px_#ef4444]" />
          {/* Eye */}
          <circle cx="88" cy="26" r="4.5" fill="#22d3ee" />
          <circle cx="89" cy="26" r="2.5" fill="#020617" />
        </svg>
      );

    case 'purplediscus':
      // Round Exotic Purple Discus Fish with magenta rings
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-lg">
          {/* Tail */}
          <path d="M25 40 L6 22 Q14 40 6 58 Z" fill="#c084fc" />
          {/* Round Discus Body */}
          <circle cx="62" cy="40" r="32" fill="#9333ea" />
          <circle cx="62" cy="40" r="26" fill="#c026d3" opacity="0.8" />
          {/* Electric stripes */}
          <path d="M45 20 Q55 40 45 60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <path d="M62 10 Q70 40 62 70" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <path d="M78 20 Q86 40 78 60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          {/* Eye */}
          <circle cx="82" cy="34" r="5" fill="#facc15" />
          <circle cx="83" cy="34" r="2.8" fill="#1e1b4b" />
          <circle cx="83.5" cy="33" r="1" fill="#ffffff" />
        </svg>
      );
  }
}
