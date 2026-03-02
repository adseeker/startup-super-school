import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { ContentIntro } from './ContentIntro';
import type { ContentIntroProps } from './types';

const RemotionRoot: React.FC = () => (
  <Composition
    id="ContentIntro"
    component={ContentIntro}
    durationInFrames={900}
    fps={30}
    width={1280}
    height={720}
    defaultProps={{
      title: 'MVP — Minimum Viable Product',
      description:
        'An MVP is the simplest version of a product that allows you to validate a key assumption with real users.',
      section: 'glossary',
      category: 'product',
      tags: ['product', 'lean', 'validation'],
      difficulty: 'beginner',
    } satisfies ContentIntroProps}
  />
);

registerRoot(RemotionRoot);
