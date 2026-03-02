import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { TitleCard } from './components/TitleCard';
import { KeyPointSlide } from './components/KeyPointSlide';
import { OutroSlide } from './components/OutroSlide';
import type { ContentIntroProps } from './types';

const ACCENT_COLORS: Record<ContentIntroProps['section'], string> = {
  glossary: '#4F46E5',
  guides: '#059669',
  concepts: '#D97706',
  articles: '#E11D48',
};

const TITLE_FRAMES = 120; // 4s
const OUTRO_FRAMES = 90;  // 3s
const TOTAL_FRAMES = 900;

export const ContentIntro: React.FC<ContentIntroProps> = ({
  title,
  description,
  section,
  tags,
  difficulty: _difficulty,
  category: _category,
  keyPoints,
}) => {
  const accentColor = ACCENT_COLORS[section];

  const pointsCount = keyPoints.length;
  const pointsFrames = TOTAL_FRAMES - TITLE_FRAMES - OUTRO_FRAMES;
  const framesPerPoint = pointsCount > 0 ? Math.floor(pointsFrames / pointsCount) : pointsFrames;
  const outroStart = TITLE_FRAMES + pointsCount * framesPerPoint;

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
      {/* Slide 1 — Title */}
      <Sequence from={0} durationInFrames={TITLE_FRAMES}>
        <TitleCard
          title={title}
          section={section}
          description={description}
          accentColor={accentColor}
        />
      </Sequence>

      {/* Slides 2..N — Key points */}
      {keyPoints.map((point, i) => (
        <Sequence
          key={i}
          from={TITLE_FRAMES + i * framesPerPoint}
          durationInFrames={framesPerPoint}
        >
          <KeyPointSlide
            point={point}
            index={i}
            total={pointsCount}
            accentColor={accentColor}
          />
        </Sequence>
      ))}

      {/* Last slide — Outro */}
      <Sequence from={outroStart} durationInFrames={TOTAL_FRAMES - outroStart}>
        <OutroSlide tags={tags} accentColor={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
