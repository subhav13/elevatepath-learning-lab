# ElevatePath Learning Lab

ElevatePath Learning Lab is a focused, local-first microlearning experience for building everyday communication confidence. It turns one useful idea into a short lesson, a quick check for understanding, and a low-stakes practice rep.

## Included in this MVP

- onboarding with three communication goals
- a five-lesson Communication journey
- lesson content with sequential unlocking
- quiz feedback and local completion progress
- Practice with a 20-second introduction prompt and deterministic feedback
- SEEK preview state with an explicit future-service boundary
- Profile with local progress and reset controls
- responsive desktop rail, tablet layout, and mobile bottom navigation

## Run locally

```bash
npm install
npm run dev
```

For a production check:

```bash
npm test -- --run
npm run build
```

Progress is stored in the browser under `elevatepath-learning-lab.progress.v1`. The MVP does not claim account sync, live AI coaching, speech analysis, expert retrieval, audio playback, or external notifications. Those are reserved seams for later service work.

## Product direction

The interface uses an original ElevatePath Learning Lab visual language: deep ink surfaces, indigo depth, lime progress signals, coral warmth, large editorial headings, and short action-oriented copy. The concept reference is preserved at [`docs/visuals/elevatepath-learning-lab-concept.png`](docs/visuals/elevatepath-learning-lab-concept.png).

## Project structure

- `src/app` — application state and view routing
- `src/components` — shared shell and primitives
- `src/data` — seeded journeys, lessons, goals, and prompts
- `src/features` — onboarding, home, learn, practice, SEEK, and profile views
- `src/lib` — local progress and deterministic practice logic
- `docs/superpowers` — approved design and implementation plan
