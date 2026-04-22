# Segment Math and Modeling Spec

## Purpose
This document defines the engineering interpretation used to build 3D screw segments for a twin-screw extrusion configuration builder.

## Core families

### GFA
- standard forward-conveying helical element
- standard 2-flight conveying family

### GFF
- more open / undercut / higher-free-volume conveying family
- visually distinct from GFA

### KB
- stack of repeated kneading discs

### 2P
- normalized two-flight conveying element

## Current machine-family reference values

- Do = 70.0 mm
- Di = 35.0 mm
- Db = 30.0 mm
- center_distance = 50.0 mm
- Omega = 82.82 degrees
- a = 10.38 mm

## Placement rules

- first segment zStart = 0
- zEnd = zStart + length
- next segment zStart = previous zEnd
- no axial gaps unless explicitly required

## Modeling notes

- conveying elements should preserve pitch and handedness visually
- GFF should remain distinct from GFA
- KB should remain a discrete disc stack and not read as a conveying helix
- current geometry may be approximate but must not erase family identity
