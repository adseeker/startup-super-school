import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import type { ContentIntroProps } from '../types';

const { fontFamily } = loadFont();

type Props = Pick<ContentIntroProps, 'tags'> & {
  accentColor: string;
};

export const OutroSlide: React.FC<Props> = ({ tags, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brandProgress = spring({
    frame,
    fps,
    config: { stiffness: 300, damping: 22 },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0F172A',
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
      {/* Background accent orb */}
      <div style={{
        position: 'absolute',
        left: '-160px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        backgroundColor: accentColor,
        opacity: 0.12,
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Brand block */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '52px',
        opacity: interpolate(brandProgress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(brandProgress, [0, 1], [28, 0])}px)`,
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '14px',
          backgroundColor: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontSize: '28px', fontWeight: 900 }}>S</span>
        </div>
        <div>
          <p style={{
            margin: 0,
            fontSize: '30px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.5px',
          }}>
            Startup Super School
          </p>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.35)',
            marginTop: '6px',
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}>
            startupsuperschool.com
          </p>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {tags.map((tag, i) => {
          const tp = spring({
            frame: Math.max(0, frame - 8 - i * 5),
            fps,
            config: { stiffness: 420, damping: 20 },
          });
          return (
            <span
              key={tag}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                border: `1.5px solid ${accentColor}`,
                color: accentColor,
                fontSize: '15px',
                fontWeight: 600,
                opacity: interpolate(tp, [0, 1], [0, 1]),
                transform: `scale(${interpolate(tp, [0, 1], [0.75, 1])})`,
                letterSpacing: '0.2px',
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};
