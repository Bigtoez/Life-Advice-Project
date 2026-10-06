import * as fs from 'fs';
import * as path from 'path';

export const VALID_TYPES = ['pattern-break', 'after-fight', 'breakup', 'group'];

const SAFETY_RULES = `
## Hard rules (always apply)
- Never diagnose, and never use medical or psychological labels about the user or anyone they mention (for example "narcissist", "depressed", "toxic" used as a diagnosis).
- Describe other people only by what the user says they did or how it affected the user.
- Never comment on medication or treatment.
- Be honest and kind. Do not flatter, and do not insult anyone.
- Never name or quote any author or teacher. Use plain, short, original wording.
- Keep replies short (a few sentences). Give warmth first, then at most one gentle question.
- If the user mentions harming themselves or others, respond with care, do not assess them, and encourage them to contact local emergency services or a crisis line.
`;

const SECTION_HEADINGS: Record<string, string> = {
  'pattern-break': '## SESSION TYPE 1: Pattern Break',
  'after-fight': '## SESSION TYPE 2: After the Fight',
  breakup: '## SESSION TYPE 3: Breakup Breakdown',
  group: '## SESSION TYPE 4: Group Session',
};

export function buildSystemPrompt(sessionType: string): string {
  let base = 'You are a calm, caring guide who helps people look at their feelings through gentle questions.';
  let typeSection = '';
  try {
    base = fs.readFileSync(path.join(process.cwd(), 'api/prompts/krishnamurti-system.md'), 'utf-8');
    const types = fs.readFileSync(path.join(process.cwd(), 'api/prompts/session-types.md'), 'utf-8');
    const heading = SECTION_HEADINGS[sessionType];
    if (heading && types.includes(heading)) {
      typeSection = heading + '\n' + types.split(heading)[1].split('---')[0];
    }
  } catch (e) {
    console.error('Prompt files not readable, using fallback prompt');
  }
  return base + '\n\n' + typeSection + '\n' + SAFETY_RULES;
}
