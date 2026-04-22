# AGENTS.md

## Project goal
Build a local-first engineering application for assembling twin-screw configurations from a catalog of known screw segments.

## Primary deliverable
A local application with:
- React + TypeScript frontend
- Three.js / react-three-fiber 3D viewer
- segment catalog panel
- assembly sequence panel
- Play / Pause / Reset controls
- data-driven segment definitions
- parametric generation support for future mathematically exact segments

## Ground rules
- Do not invent hidden OEM geometry.
- Keep catalog metadata, visual geometry, and engineering definitions separate.
- Keep geometry generators deterministic and testable.
- Use clear TypeScript types for all segment records.
- Preserve a local-first workflow.

## Important
When uncertain, prefer:
1. working local app
2. clean data pipeline
3. explicit TODO comments for geometry details
instead of speculative CAD
