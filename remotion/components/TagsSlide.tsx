import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import type { ContentIntroProps } from '../types';

type Props = Pick<ContentIntroProps, 'tags' | 'difficulty'> & {
  accentColor: string;
  startFrame: number;
};

export const TagsSlide: React.FC<Props> = ({ tags, difficulty, accentColor, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;

  const headerProgress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [20, 0]);

  // Difficulty badge color
  const difficultyColors: Record<string, string> = {
    beginner: '#059669',
    intermediate: '#D97706',
    advanced: '#E11D48',
  };
  const difficultyColor = difficultyColors[difficulty] ?? accentColor;

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
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: '48px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            margin: 0,
          }}
        >
          Key Topics
        </h2>
      </div>

      {/* Tag pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '64px',
        }}
      >
        {tags.map((tag, i) => {
          const tagFrame = relativeFrame - i * 8;
          const tagProgress = spring({
            frame: Math.max(0, tagFrame),
            fps,
            config: { damping: 10, stiffness: 100 },
          });
          const tagScale = interpolate(tagProgress, [0, 1], [0.6, 1]);
          const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);

          return (
            <div
              key={tag}
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                backgroundColor: `${accentColor}18`,
                border: `2px solid ${accentColor}`,
                color: accentColor,
                fontSize: '22px',
                fontWeight: 600,
                transform: `scale(${tagScale})`,
                opacity: tagOpacity,
                transformOrigin: 'center',
              }}
            >
              {tag}
            </div>
          );
        })}

        {/* Difficulty badge */}
        <div
          style={{
            padding: '12px 24px',
            borderRadius: '9999px',
            backgroundColor: `${difficultyColor}18`,
            border: `2px solid ${difficultyColor}`,
            color: difficultyColor,
            fontSize: '22px',
            fontWeight: 600,
            opacity: headerOpacity,
          }}
        >
          {difficulty}
        </div>
      </div>

      {/* Branding footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 800 }}>S</span>
        </div>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: accentColor,
            letterSpacing: '-0.5px',
          }}
        >
          Startup Super School
        </span>
      </div>
    </div>
  );
};
