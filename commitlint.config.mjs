export default {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(🎨|📰|✨|📝|💄|🐎|📚|🐛|🚑|🔥|🚜|🔨|💎|🔖|🚀|♻️|📦|✅)\s?(Feat|Fix|Chore|Style|Docs|Refactor|Test):\s(.+?)(?:\s+\(#\d+\))?$/u,
      headerCorrespondence: ['emoji', 'type', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', ['Feat', 'Fix', 'Chore', 'Style', 'Docs', 'Refactor', 'Test']],
    'type-case': [2, 'always', 'pascal-case'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
