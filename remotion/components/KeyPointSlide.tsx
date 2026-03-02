import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

type Props = {
  point: string;
  index: number;
  total: number;
  accentColor: string;
};

export const KeyPointSlide: React.FC<Props> = ({ point, index, total, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text — punches in from right
  const slideProgress = spring({
    frame,
    fps,
    config: { stiffness: 320, damping: 24 },
  });

  // Ghost number — fades in slightly delayed
  const ghostProgress = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { stiffness: 200, damping: 28 },
  });

  // Badge — punches in with bounce
  const badgeProgress = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { stiffness: 450, damping: 18 },
  });

  const num = String(index + 1).padStart(2, '0');
  const clean = point.replace(/\*\*/g, '').replace(/`/g, '').trim();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 100px',
        boxSizing: 'border-box',
        fontFamily,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '7px',
        backgroundColor: accentColor,
      }} />

      {/* Ghost number — background */}
      <div style={{
        position: 'absolute',
        right: '40px',
        bottom: '-30px',
        fontSize: '220px',
        fontWeight: 900,
        color: accentColor,
        opacity: interpolate(ghostProgress, [0, 1], [0, 0.06]),
        lineHeight: 1,
        userSelect: 'none',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-8px',
      }}>
        {num}
      </div>

      {/* Progress dots — top right */}
      <div style={{
        position: 'absolute',
        top: '44px',
        right: '60px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? '20px' : '7px',
              height: '7px',
              borderRadius: '9999px',
              backgroundColor: i === index ? accentColor : `${accentColor}40`,
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateX(${interpolate(slideProgress, [0, 1], [100, 0])}px)`,
          opacity: interpolate(slideProgress, [0, 1], [0, 1]),
          maxWidth: '880px',
        }}
      >
        {/* Number badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          borderRadius: '8px',
          backgroundColor: accentColor,
          marginBottom: '28px',
          transform: `scale(${interpolate(badgeProgress, [0, 1], [0.5, 1])})`,
        }}>
          <span style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.5px',
          }}>
            {num}
          </span>
        </div>

        <p style={{
          margin: 0,
          fontSize: '44px',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1.22,
          letterSpacing: '-0.5px',
          maxWidth: '800px',
        }}>
          {clean}
        </p>
      </div>
    </div>
  );
};
