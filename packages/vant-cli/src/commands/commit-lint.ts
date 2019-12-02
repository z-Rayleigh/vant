import { logger } from '../common';
import { readFileSync } from 'fs-extra';

const commitRE = /^(revert: )?(fix|feat|docs|perf|test|types|build|chore|refactor|breaking change)(\(.+\))?: .{1,50}/;
const mergeRE = /Merge branch /;

export function commitLint() {
  const gitParams = process.env.HUSKY_GIT_PARAMS as string;
  const commitMsg = readFileSync(gitParams, 'utf-8').trim();

  if (!commitRE.test(commitMsg) || !mergeRE.test(commitMsg)) {
    logger.error(`Error: invalid commit message: "${commitMsg}".

Proper commit message format is required for automated changelog generation.

Examples: 

- fix(Button): incorrect style
- feat(Button): incorrect style
- docs(Button): fix typo

Allowed Types:

- fix
- feat
- docs
- perf
- test
- types
- build
- chore
- refactor
- breaking change
- Merge branch 'foo' into 'bar'
`);
    process.exit(1);
  }
}
