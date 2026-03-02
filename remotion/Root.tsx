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
      title: 'How to Build a Startup Product Roadmap',
      description:
        'Learn how to build a product roadmap that drives alignment without stifling adaptability — from prioritization to stakeholder communication.',
      section: 'guides',
      category: 'product',
      tags: ['product', 'roadmap', 'planning', 'team', 'strategy'],
      difficulty: 'intermediate',
      keyPoints: [
        'What a Product Roadmap Is (and Is Not)',
        'Why Roadmaps Fail at Startups',
        'The Now / Next / Later Framework',
        'How to Prioritize: RICE and ICE Scoring',
        'Pre-PMF vs. Post-PMF Roadmaps',
      ],
    } satisfies ContentIntroProps}
  />
);

registerRoot(RemotionRoot);
