# Segment App

Local-first React + TypeScript + Vite application for assembling and previewing twin-screw segment configurations in 3D.

## Status

This repository contains a working local MVP with:

- searchable segment catalog
- 3D assembly viewer
- contiguous end-to-end placement
- play / pause / reset controls
- example imported configurations
- family-aware procedural geometry
- parser and geometry extension points for real workbook ingestion

## Run locally

```bash
npm install
npm run dev
```

Or on Windows:

```bat
run-local.bat
```

Then open:

- [http://localhost:5173](http://localhost:5173)

## Validation

```bash
npm run test
npm run build
```

## Notes

- The current catalog is seeded because the workbook files were not present during reconstruction.
- Geometry is engineering-oriented visualization, not OEM-certified CAD.
