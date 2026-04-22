# Implementation Report

## 1. What Was Implemented

- rebuilt a clean local-first `segment-app` repository
- added layered app structure for:
  - catalog
  - assembly
  - viewer
  - geometry
  - math
  - parser
  - state
- implemented family-aware visual handling for `GFA`, `GFF`, `KB`, `2P`, and `GFM`
- added local run workflow with `run-local.bat`
- added seeded catalog data and workbook import hook

## 2. Visual Accuracy Status

### GFA
- visually compact two-flight conveying element
- approximate lobed body and helical lands

### GFF
- visibly more open than GFA
- still approximate and not exact undercut geometry

### KB
- discrete disc stack with stagger progression
- still simplified relative to real kneading-disc geometry

## 3. Engineering Assumptions

- Do = 70 mm
- Db = 30 mm
- C = 50 mm
- current geometry is procedural approximation
- current catalog is seeded because raw workbook files were not available

## 4. Known Limitations

- no exact conjugate self-wiping profile equations
- no exact GFF undercut definition
- no exact kneading-disc geometry
- no paired twin-screw mesh yet

## 5. Missing Information

- exact cross-section equations
- exact GFF undercut profile
- exact kneading-disc outer contour
- real workbook files

## 6. Questions for the User / Expert Systems

- What exact profile differentiates GFF from GFA?
- What is the correct kneading-disc contour for this machine family?
- Are GFA/GFF/2P always two-flight in your naming system?
- What exact geometry should be used for neutral KB?

## 7. Next Recommended Steps

1. ingest the real workbook files
2. replace seeded catalog data
3. upgrade exact self-wiping profile math
4. add paired twin-screw rendering

## 8. How To Run

```bash
npm install
npm run dev
```

Or:

```bat
run-local.bat
```

Open:

- `http://localhost:5173`
