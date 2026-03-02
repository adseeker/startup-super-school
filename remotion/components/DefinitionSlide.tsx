import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import type { ContentIntroProps } from '../types';

type Props = Pick<ContentIntroProps, 'title' | 'description'> & {
  accentColor: string;
  startFrame: number;
};

function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxCharsPerLine) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 4);
}

export const DefinitionSlide: React.FC<Props> = ({ title, description, accentColor, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;

  const titleProgress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  const lines = wrapText(description, 55);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        borderTop: `8px solid ${accentColor}`,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: '48px',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: accentColor,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: '60px',
            height: '4px',
            backgroundColor: accentColor,
            marginTop: '12px',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Description lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {lines.map((line, i) => {
          const lineFrame = relativeFrame - i * 10;
          const lineProgress = spring({
            frame: Math.max(0, lineFrame),
            fps,
            config: { damping: 14, stiffness: 60 },
          });
          const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1]);
          const lineX = interpolate(lineProgress, [0, 1], [30, 0]);

          return (
            <p
              key={i}
              style={{
                fontSize: '32px',
                fontWeight: 400,
                color: '#374151',
                lineHeight: 1.5,
                margin: 0,
                opacity: lineOpacity,
                transform: `translateX(${lineX}px)`,
              }}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};
