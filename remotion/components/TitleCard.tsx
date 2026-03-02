import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ContentIntroProps } from '../types';

const { fontFamily } = loadFont();

type Props = Pick<ContentIntroProps, 'title' | 'section' | 'description'> & {
  accentColor: string;
};

export const TitleCard: React.FC<Props> = ({ title, section, description, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = title.split(' ');

  // Line draws in from left — starts at frame 10
  const lineProgress = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { stiffness: 400, damping: 30 },
  });

  // Subtitle fades in after title
  const subProgress = spring({
    frame: Math.max(0, frame - words.length * 3 - 8),
    fps,
    config: { stiffness: 200, damping: 24 },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: accentColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        boxSizing: 'border-box',
        fontFamily,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Geometric circles — depth */}
      <div style={{
        position: 'absolute',
        right: '-140px',
        top: '-140px',
        width: '480px',
        height: '480px',
        borderRadius: '50%',
        border: '80px solid rgba(255,255,255,0.07)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: '80px',
        bottom: '-180px',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        border: '50px solid rgba(255,255,255,0.05)',
        pointerEvents: 'none',
      }} />

      {/* Section label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '36px',
        opacity: interpolate(
          spring({ frame, fps, config: { stiffness: 400, damping: 28 } }),
          [0, 1], [0, 1]
        ),
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.6)',
        }} />
        <span style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}>
          {section}
        </span>
      </div>

      {/* Title — word by word from below */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '14px',
        rowGap: '4px',
        maxWidth: '920px',
        marginBottom: '40px',
      }}>
        {words.map((word, i) => {
          const wp = spring({
            frame: Math.max(0, frame - i * 3),
            fps,
            config: { stiffness: 380, damping: 22 },
          });
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                transform: `translateY(${interpolate(wp, [0, 1], [64, 0])}px)`,
                opacity: interpolate(wp, [0, 1], [0, 1]),
                fontSize: '52px',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-1px',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Divider line — draws in */}
      <div style={{
        width: `${interpolate(lineProgress, [0, 1], [0, 240])}px`,
        height: '3px',
        backgroundColor: 'rgba(255,255,255,0.35)',
        borderRadius: '2px',
        marginBottom: '28px',
      }} />

      {/* Subtitle */}
      <p style={{
        margin: 0,
        fontSize: '18px',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.65)',
        maxWidth: '700px',
        lineHeight: 1.5,
        opacity: interpolate(subProgress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(subProgress, [0, 1], [16, 0])}px)`,
      }}>
        {description}
      </p>
    </div>
  );
};
