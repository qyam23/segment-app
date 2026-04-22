# Codex System Directive

## Read first

Before substantial work, read:

1. `AGENTS.md`
2. `README.md`
3. `docs/segment_math_spec.md`
4. `docs/codex_execution_prompt.md`
5. `docs/codex_engineering_handoff.md`
6. `docs/openai_tool_selection.md`
7. `docs/implementation_report.md` when relevant

## Project rules

- Keep the repository local-first.
- Preserve the current folder structure unless clearly justified.
- Keep math, parsing, geometry, assembly, viewer, and UI separated.
- Do not put geometry rules directly inside UI components.
- Preserve:
  - pitch effect
  - handedness
  - flight-count differences
  - KB stagger-angle effect
  - contiguous axial placement

## Validation

After meaningful changes, run:

```bash
npm run test
npm run build
```
