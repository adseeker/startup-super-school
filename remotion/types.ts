export interface ContentIntroProps {
  title: string;
  description: string;
  section: 'glossary' | 'guides' | 'concepts' | 'articles';
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  keyPoints: string[];
}
