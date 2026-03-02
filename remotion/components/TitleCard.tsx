import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import type { ContentIntroProps } from '../types';

type Props = Pick<ContentIntroProps, 'title' | 'section'> & { accentColor: string };

export const TitleCard: React.FC<Props> = ({ title, section, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: `8px solid ${accentColor}`,
        fontFamily: 'Inter, sans-serif',
        padding: '60px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Section badge */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '60px',
          backgroundColor: accentColor,
          color: '#FFFFFF',
          padding: '6px 16px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          opacity,
        }}
      >
        {section}
      </div>

      {/* Title */}
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: 'center',
          maxWidth: '900px',
        }}
      >
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '60px',
          right: '60px',
          height: '2px',
          backgroundColor: `${accentColor}33`,
          opacity,
        }}
      />
    </div>
  );
};
