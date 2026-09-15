# ElevatePath Learning Lab Design

**Date:** 2026-09-15  
**Status:** Approved direction; awaiting written-spec review  
**Repository:** `subhav13/elevatepath-learning-lab`  
**Site slug:** `elevatepath-learning-lab`  
**Visibility:** Public

## 1. Product intent

ElevatePath Learning Lab is an original, responsive web interpretation of the
research brief for a structured communication micro-learning product. The
first release should make the core loop tangible:

1. Choose a growth goal.
2. See the next short lesson in a daily dashboard.
3. Read a focused lesson and complete a quick knowledge check.
4. Mark progress and return to a visible streak.

The research document is treated as product input, not as an execution
instruction. The implementation will not copy third-party proprietary assets,
content, or visual identity. Later AI, speech, payment, and account features
must be added behind explicit interfaces rather than implied by mock data.

## 2. Scope for the first implementation slice

### Included

- A mobile-first app shell that also works on a desktop viewport.
- Goal selection during first use, persisted locally.
- A daily home view with the next lesson, streak/progress summary, and a
  compact journey overview.
- One seeded Communication journey with a small ordered lesson sequence.
- Lesson detail view with readable content, a practical exercise, and a
  multiple-choice quiz.
- Quiz answer feedback, completion state, and progress updates.
- A journey/library view showing available lessons and locked/unlocked state.
- A lightweight Practice view that demonstrates a text-based introduction
  rehearsal using local prompts and feedback; it is deliberately not presented
  as live AI or speech analysis.
- Navigation between the core views, meaningful selected states, responsive
  behavior, keyboard focus treatment, and reduced-motion support.
- A short README describing local development, the seeded-data boundary, and
  the future service seams.

### Deferred

- Real authentication, social login, and account recovery.
- Server-backed storage or synchronization across devices.
- Real speech recording, transcription, filler detection, or audio retention.
- Production LLM calls, vector search, expert citations, and SEEK retrieval.
- Subscriptions, in-app purchase, analytics, push notifications, and
  community features.
- Additional journeys beyond the first Communication journey.

Deferred features may be represented by explicit extension points or honest
“coming next” language, but no UI may claim that these services are active.

## 3. Product structure

The app has five top-level destinations:

- **Home:** the next 15-minute lesson, progress, streak, and current journey.
- **Learn:** journey and lesson browsing.
- **Practice:** a local introduction rehearsal flow with prompt, draft, and
  feedback state.
- **SEEK:** a clearly labeled local knowledge prompt/demo state reserved for a
  future cited retrieval system; it must not invent live expert results.
- **Profile:** local preferences, goal, progress summary, and product boundary
  notes.

The daily learning loop is the primary workflow. Navigation should support
returning to Home without losing the current lesson or quiz state.

## 4. Experience and visual direction

The visual system should feel focused, optimistic, and editorial rather than
like a generic SaaS dashboard:

- A deep ink base with restrained indigo/blue surfaces and a bright, warm
  accent for progress and primary actions.
- Generous whitespace, strong type hierarchy, and compact lesson metadata.
- A simple brand mark, minimal top chrome, and a bottom navigation rail on
  narrow screens; a compact side rail may appear at desktop widths.
- One purposeful primary lesson surface, supported by open sections and rows;
  avoid a wall of identical cards.
- Soft elevation, consistent medium radii, and subtle state transitions.
- Code-native text and controls. No screenshot-as-UI shortcut and no fake
  metrics used only as decoration.

The final color, typography, asset, and motion tokens will be captured from a
visual concept pass before coding. The concept must cover the primary Home,
Lesson/Quiz, Learn, Practice, and mobile continuation states.

## 5. Technical architecture

Use React + Vite with a small, focused component structure:

- `src/app/` — app composition, routing/view state, and persistence boundary.
- `src/components/` — shared navigation, buttons, progress indicators, lesson
  rows, and feedback primitives.
- `src/features/home/` — dashboard composition and daily lesson surface.
- `src/features/learn/` — journey and lesson browsing.
- `src/features/practice/` — local introduction rehearsal flow.
- `src/features/seek/` — honest reserved-state experience for future retrieval.
- `src/features/profile/` — local preference and progress summary.
- `src/data/` — typed seeded journeys, lessons, exercises, and practice
  prompts, separate from view code.
- `src/lib/` — local progress and persistence helpers.
- `src/styles/` — design tokens, global styles, and responsive rules.

`App` remains composition glue. Feature modules own their display and local
interaction rules; seeded data does not know about rendering; persistence is
accessed through a small interface so a backend can replace it later.

## 6. State and data flow

The first release uses deterministic seeded data and browser-local persistence.
The app state includes:

- selected goal;
- completed lesson IDs;
- current lesson and quiz selections;
- streak/completion summary derived from completed lessons; and
- the current Practice draft and feedback state.

State changes flow from user actions through small helpers, then update the
active view and persistence. A refresh should retain the selected goal and
completed lessons. Resetting local progress should be explicit and scoped to
the local demo state.

The future service boundaries are:

- `ProgressStore` for authenticated, server-backed progress;
- `SpeechAnalysisService` for audio/transcript analysis;
- `SeekSearchService` for retrieval plus citation metadata; and
- `CoachService` for practice feedback.

The first implementation supplies local adapters only where the experience is
needed.

## 7. Accessibility and safety

- Use semantic headings, landmarks, buttons, and form controls.
- Maintain visible keyboard focus and sufficient color contrast.
- Do not rely on color alone for selected, locked, or completed states.
- Respect `prefers-reduced-motion`.
- Keep seeded content free of personal or sensitive data.
- Do not request microphone permissions or persist audio in this slice.
- Mark local demo states clearly so users are not misled about AI, search, or
  account functionality.

## 8. Testing and verification

The implementation should include focused tests for:

- progress persistence and reset behavior;
- lesson completion and quiz answer feedback;
- goal selection and navigation state; and
- responsive layout smoke checks where the chosen test setup supports them.

Before publishing, verify the built app in a browser at desktop and mobile
sizes. Exercise the core path from goal selection through lesson completion,
reload the page, and confirm progress remains. Inspect the accepted visual
concept and the latest implementation screenshot side by side, recording at
least five concrete fidelity checks covering copy, layout, typography, color,
spacing/container behavior, and responsive continuation.

## 9. Delivery and GitHub/Sites checkpoints

The project will use public GitHub repository `subhav13/elevatepath-learning-lab`
and a matching Sites project. Push only meaningful, coherent milestones:

1. approved design specification;
2. app shell and design tokens;
3. functional learning loop;
4. practice/SEEK/profile surfaces and responsive polish; and
5. final verification fixes.

For Sites, the exact pushed commit will be used as the source identity for a
saved version and production deployment. The site should remain on its default
owner-private state unless the user separately requests a different audience;
the GitHub repository itself is public as approved.

## 10. Acceptance criteria

The first slice is ready when:

- a new user can select a goal and reach a useful Home view;
- the primary lesson can be opened, read, answered, completed, and revisited;
- progress survives a reload and is visible in Home and Profile;
- Learn, Practice, SEEK, and Profile each have an intentional, honest state;
- the app works at desktop and mobile widths without overflow or clipped
  primary content;
- the implementation uses reusable components and keeps seeded data separate
  from presentation;
- focused tests and the production build pass; and
- the browser-rendered result has been visually checked against the accepted
  concept before publication.
