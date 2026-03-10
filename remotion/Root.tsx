import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { ContentIntro } from './ContentIntro';
import { FundraisingModern } from './FundraisingModern';
import type { ContentIntroProps } from './types';

const RemotionRoot: React.FC = () => (
  <>
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
    <Composition
      id="FundraisingModern"
      component={FundraisingModern}
      durationInFrames={1050}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{
        title: 'The Startup Fundraising Process',
        description:
          'The fundraising process is opaque by design. This article maps every phase — from prep to close — so you can run it like an operator.',
        section: 'articles',
        category: 'fundraising',
        tags: ['fundraising', 'investors', 'venture capital', 'pitch', 'process'],
        difficulty: 'intermediate',
        keyPoints: [
          'Phase 1: Preparation (8–12 Weeks Before You Talk to Investors)',
          'Phase 2: Building the Pipeline (4–6 Weeks)',
          'Phase 3: Running the Process (4–6 Weeks)',
          'Phase 4: Getting to a Term Sheet',
          'Phase 5: Closing the Round',
        ],
      } satisfies ContentIntroProps}
    />
  </>
);

registerRoot(RemotionRoot);
