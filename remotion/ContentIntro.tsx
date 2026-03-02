import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { TitleCard } from './components/TitleCard';
import { DefinitionSlide } from './components/DefinitionSlide';
import { TagsSlide } from './components/TagsSlide';
import type { ContentIntroProps } from './types';

const ACCENT_COLORS: Record<ContentIntroProps['section'], string> = {
  glossary: '#4F46E5',
  guides: '#059669',
  concepts: '#D97706',
  articles: '#E11D48',
};

// Timeline
// 0–180   TitleCard
// 181–600 DefinitionSlide
// 601–870 TagsSlide
// 871–900 Fade out
const TITLE_END = 180;
const DEFINITION_START = 181;
const DEFINITION_END = 600;
const TAGS_START = 601;
const TAGS_END = 870;
const FADEOUT_START = 871;

export const ContentIntro: React.FC<ContentIntroProps> = ({
  title,
  description,
  section,
  category: _category,
  tags,
  difficulty,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const accentColor = ACCENT_COLORS[section];

  const globalOpacity = interpolate(
    frame,
    [FADEOUT_START, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', opacity: globalOpacity }}>
      <Sequence from={0} durationInFrames={TITLE_END + 1}>
        <TitleCard title={title} section={section} accentColor={accentColor} />
      </Sequence>

      <Sequence from={DEFINITION_START} durationInFrames={DEFINITION_END - DEFINITION_START + 1}>
        <DefinitionSlide
          title={title}
          description={description}
          accentColor={accentColor}
          startFrame={DEFINITION_START}
        />
      </Sequence>

      <Sequence from={TAGS_START} durationInFrames={TAGS_END - TAGS_START + 1}>
        <TagsSlide
          tags={tags}
          difficulty={difficulty}
          accentColor={accentColor}
          startFrame={TAGS_START}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
