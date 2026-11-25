# CSHR Runtime — Frontend Prototype

A responsive React + TypeScript dashboard prototype for the Cognitive State-Healing Runtime (CSHR).

## Requirements
- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Included screens
1. Overview — runtime KPIs, state-tree preview, context health, drift chart, context diff and sentinel events.
2. Arena Compare — unprotected vs CSHR-protected agent execution.
3. Cognitive State Tree — committed, pruned and injected state branches.
4. Context Diff — removed context and injected constraints.
5. Shadow Sandbox — editable SQL mutation with simulated dry-run / rollback outcome.
6. Sentinel Telemetry — goal alignment, loop similarity and latency signals.
7. Chaos & Policies — adjustable thresholds, policy toggles and failure injection controls.
8. ROI & Benchmarks — reliability and cost metrics.
9. Auto Demo — guided quick tour.

## Architecture notes
- This is a frontend-only prototype with deterministic demo data. The Run Live Demo button updates the local event stream and demo counter; it does not call a backend yet.
- The UI uses only React and React DOM at runtime. Charts and the state tree are rendered with native CSS/SVG, avoiding fragile chart/graph dependencies and reducing module-resolution risk.
- Backend integration points can be added later through a typed API client (for example, FastAPI endpoints and Server-Sent Events).
