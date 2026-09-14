# RiseGuide Learning Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a polished, responsive RiseGuide Learning Lab web MVP with a real local learning loop, honest future-service boundaries, and verified desktop/mobile behavior.

**Architecture:** React + Vite + TypeScript with feature-oriented components, deterministic seeded content, and a small browser-local progress store. App views communicate through explicit state and service interfaces so authentication, server persistence, speech analysis, retrieval, and coaching can replace local adapters later.

**Tech Stack:** React, TypeScript, Vite, Vitest, Testing Library, jsdom, lucide-react, CSS custom properties, Sites hosting, GitHub.

**Spec:** `docs/superpowers/specs/2026-09-15-riseguide-learning-lab-design.md`

## Global Constraints

- The GitHub repository is public and named `subhav13/riseguide-learning-lab`.
- The Sites slug is `riseguide-learning-lab`; keep Sites access owner-private unless the user separately requests a different audience.
- Use original copy, seeded content, and visual assets; do not copy RiseGuide proprietary assets or identity.
- Keep AI, speech, authentication, payment, analytics, push, and server persistence deferred and explicitly labeled.
- Preserve semantic HTML, keyboard focus, color contrast, reduced-motion support, and responsive behavior.
- Follow RED-GREEN-REFACTOR for every behavior-bearing production module.
- Push only coherent milestones: design/plan, app shell, learning loop, remaining surfaces, and verified polish.

---

### Task 1: Establish the React/Vite testable project

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces npm scripts `dev`, `build`, `test`, and `test:watch` used by every later task.
- Produces a Vitest jsdom environment with Testing Library matchers available from `src/test/setup.ts`.

- [ ] **Step 1: Add the package and compiler configuration**

  Use React 18, Vite 6, TypeScript 5, Vitest 2, Testing Library, jsdom, and lucide-react. The scripts must be:

  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "test": "vitest run",
      "test:watch": "vitest"
    }
  }
  ```

  Configure `vite.config.ts` with the React plugin and:

  ```ts
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  }
  ```

- [ ] **Step 2: Install dependencies and verify the empty harness**

  Run:

  ```bash
  npm install
  npm test -- --passWithNoTests
  ```

  Expected: npm completes without audit-blocking errors and Vitest exits successfully with no test files.

- [ ] **Step 3: Commit the project harness**

  ```bash
  git add package.json package-lock.json index.html tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts src/test/setup.ts .gitignore
  git commit -m "chore: scaffold RiseGuide Learning Lab app"
  ```

### Task 2: Create the visual concept and shared design system

**Files:**
- Create: `docs/visuals/riseguide-learning-lab-concept.png`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/BrandMark.tsx`
- Create: `src/components/ProgressBar.tsx`
- Create: `src/components/ActionButton.tsx`
- Create: `src/components/SectionHeading.tsx`

**Interfaces:**
- Shared components accept explicit semantic props and render accessible code-native controls.
- `tokens.css` is the only source for core colors, type scale, spacing, radii, borders, and motion timing.

- [ ] **Step 1: Generate the approved visual reference before coding the UI**

  Use the built-in image generation tool with a `ui-mockup` prompt showing the agreed product surface: an original mobile-first communication micro-learning dashboard with Home, Lesson/Quiz, Learn, Practice, SEEK reserved state, and a compact mobile continuation. Require readable, code-implementable hierarchy, deep ink background, indigo surfaces, warm lime/coral progress accent, generous whitespace, and no copied logos, screenshots, or branded assets.

  Save the selected concept into `docs/visuals/riseguide-learning-lab-concept.png` and inspect it before extracting tokens.

- [ ] **Step 2: Extract tokens from the concept**

  Define variables for the exact chosen background/surface/text/accent colors, spacing scale, radii, border alpha, shadow, heading/body/control typography, and reduced-motion timing. Include a `@media (prefers-reduced-motion: reduce)` override.

- [ ] **Step 3: Add the minimal shared primitives**

  `ActionButton` must expose `variant: 'primary' | 'secondary' | 'ghost'`, `type`, `disabled`, and native button props. `ProgressBar` must expose `value` and `max` and include a text alternative. `BrandMark` must render the app name as text/SVG-native UI, not a raster screenshot.

- [ ] **Step 4: Run the build and commit the design system**

  Run `npm run build`, inspect the concept and CSS for consistency, then commit:

  ```bash
  git add docs/visuals src/styles src/components/BrandMark.tsx src/components/ProgressBar.tsx src/components/ActionButton.tsx src/components/SectionHeading.tsx
  git commit -m "feat: add RiseGuide Learning Lab design system"
  ```

### Task 3: Implement and test the local content/progress boundary

**Files:**
- Create: `src/data/types.ts`
- Create: `src/data/content.ts`
- Create: `src/lib/progress.ts`
- Create: `src/lib/progress.test.ts`
- Create: `src/lib/practice.ts`
- Create: `src/lib/practice.test.ts`

**Interfaces:**
- `Goal`, `QuizQuestion`, `Lesson`, `Journey`, and `PracticePrompt` live in `src/data/types.ts`.
- `loadProgress(storage: Storage): ProgressState`, `saveProgress(storage: Storage, state: ProgressState): void`, `resetProgress(storage: Storage): ProgressState`, and `completeLesson(state: ProgressState, lessonId: string): ProgressState` live in `src/lib/progress.ts`.
- `buildPracticeFeedback(draft: string): PracticeFeedback` lives in `src/lib/practice.ts`.

- [ ] **Step 1: Write the progress tests first**

  Cover these exact behaviors:

  ```ts
  it('returns the default state when storage is empty', () => {
    expect(loadProgress(localStorage)).toEqual(DEFAULT_PROGRESS);
  });

  it('round-trips selected goal and completed lessons through storage', () => {
    const state = completeLesson({ ...DEFAULT_PROGRESS, selectedGoalId: 'speak-clearly' }, 'lesson-1');
    saveProgress(localStorage, state);
    expect(loadProgress(localStorage)).toEqual(state);
  });

  it('does not add the same lesson twice', () => {
    const state = completeLesson(completeLesson(DEFAULT_PROGRESS, 'lesson-1'), 'lesson-1');
    expect(state.completedLessonIds).toEqual(['lesson-1']);
  });

  it('resets only the local learning state', () => {
    saveProgress(localStorage, completeLesson(DEFAULT_PROGRESS, 'lesson-1'));
    expect(resetProgress(localStorage)).toEqual(DEFAULT_PROGRESS);
    expect(loadProgress(localStorage)).toEqual(DEFAULT_PROGRESS);
  });
  ```

- [ ] **Step 2: Run the progress tests and confirm the expected RED state**

  Run `npm test -- src/lib/progress.test.ts`. It must fail because `src/lib/progress.ts` does not exist yet, not because of a test setup error.

- [ ] **Step 3: Implement the minimal progress store**

  Use a versioned storage key, JSON serialization, duplicate-safe completion, and graceful fallback to `DEFAULT_PROGRESS` for malformed data. Keep all browser access injected through the `Storage` parameter.

- [ ] **Step 4: Run the progress tests and refactor only after GREEN**

  Run `npm test -- src/lib/progress.test.ts` and then `npm test`. Both must pass with no warnings.

- [ ] **Step 5: Write practice feedback tests before implementation**

  Cover an empty draft, a short draft, and a draft containing a clear three-part structure. Assert user-facing feedback fields rather than internal branches.

- [ ] **Step 6: Run the practice tests to confirm RED, implement, and verify GREEN**

  Run the focused test, implement the smallest deterministic `buildPracticeFeedback` function, then run the focused test and the full suite.

- [ ] **Step 7: Commit the data boundary**

  ```bash
  git add src/data src/lib
  git commit -m "feat: add seeded learning content and local progress store"
  ```

### Task 4: Build the app shell and onboarding flow

**Files:**
- Create: `src/app/viewTypes.ts`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `src/components/AppShell.tsx`
- Create: `src/components/BottomNav.tsx`
- Create: `src/features/onboarding/OnboardingView.tsx`
- Create: `src/main.tsx`
- Modify: `index.html`

**Interfaces:**
- `ViewName = 'home' | 'learn' | 'practice' | 'seek' | 'profile'` in `src/app/viewTypes.ts`.
- `AppShell` accepts `activeView`, `onNavigate`, `children`, and `progressSummary`.
- `OnboardingView` accepts `goals`, `selectedGoalId`, and `onSelectGoal`.

- [ ] **Step 1: Write failing onboarding and navigation tests**

  Test that a first-use visitor sees the goal choices, selecting a goal reveals Home, Home navigation changes the selected destination, and the active destination has an accessible selected state.

- [ ] **Step 2: Run `npm test -- src/app/App.test.tsx` and confirm RED**

  The tests must fail because the app shell and views are not implemented.

- [ ] **Step 3: Implement the shell and onboarding**

  Mount React from `src/main.tsx`; load progress from `window.localStorage`; gate the shell on `selectedGoalId`; render a bottom navigation on narrow screens and a side rail at desktop widths; save the selected goal before showing Home.

- [ ] **Step 4: Verify GREEN and responsive semantics**

  Run the focused test and full suite, then `npm run build`. Confirm buttons are keyboard reachable and navigation labels remain visible without relying on icons alone.

- [ ] **Step 5: Commit the shell milestone**

  ```bash
  git add src/app src/components/AppShell.tsx src/components/BottomNav.tsx src/features/onboarding src/main.tsx index.html
  git commit -m "feat: add responsive app shell and onboarding"
  ```

### Task 5: Build the Home, Learn, Lesson, and Quiz learning loop

**Files:**
- Create: `src/features/home/HomeView.tsx`
- Create: `src/features/home/HomeView.test.tsx`
- Create: `src/features/learn/LearnView.tsx`
- Create: `src/features/learn/LearnView.test.tsx`
- Create: `src/features/learn/LessonView.tsx`
- Create: `src/features/learn/LessonView.test.tsx`
- Create: `src/components/LessonRow.tsx`
- Create: `src/components/QuizCard.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- `HomeView` receives the current `Journey`, `ProgressState`, and callbacks for opening lessons and navigating.
- `LearnView` receives journeys, `ProgressState`, and `onOpenLesson`.
- `LessonView` receives a `Lesson`, `ProgressState`, `onCompleteLesson`, and `onBack`.
- `QuizCard` receives one `QuizQuestion`, selected answer ID, and `onSelectAnswer`.

- [ ] **Step 1: Write failing tests for the core learning workflow**

  Cover: Home shows the next incomplete lesson; Learn marks completed lessons and locks later lessons; Lesson shows the quiz; selecting an answer reveals correct/incorrect feedback; completing a lesson updates the completion action.

- [ ] **Step 2: Run all three focused test files and confirm RED**

  Run `npm test -- src/features/home/HomeView.test.tsx src/features/learn/LearnView.test.tsx src/features/learn/LessonView.test.tsx` and confirm failures are caused by missing behavior.

- [ ] **Step 3: Implement seeded journey rendering and local completion**

  Use the Communication journey from `src/data/content.ts`, render the next lesson prominently on Home, preserve lesson order in Learn, and only unlock lesson `n + 1` after lesson `n` is completed. Keep completion idempotent through `completeLesson`.

- [ ] **Step 4: Implement quiz feedback and completion gating**

  Do not enable completion until the learner selects an answer. Show feedback text and a retry/continue path in the same view. Avoid confetti or decorative effects that obscure the answer state.

- [ ] **Step 5: Run focused tests, full tests, and build**

  Run the focused tests, `npm test`, and `npm run build`. Fix behavior or typing failures before moving on.

- [ ] **Step 6: Commit the functional learning loop**

  ```bash
  git add src/features/home src/features/learn src/components/LessonRow.tsx src/components/QuizCard.tsx src/app/App.tsx
  git commit -m "feat: add daily lesson and quiz learning loop"
  ```

### Task 6: Add Practice, SEEK, Profile, and honest future-service states

**Files:**
- Create: `src/features/practice/PracticeView.tsx`
- Create: `src/features/practice/PracticeView.test.tsx`
- Create: `src/features/seek/SeekView.tsx`
- Create: `src/features/seek/SeekView.test.tsx`
- Create: `src/features/profile/ProfileView.tsx`
- Create: `src/features/profile/ProfileView.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- `PracticeView` consumes `PracticePrompt`, holds a local draft, and calls `buildPracticeFeedback` on submit.
- `SeekView` renders a local prompt composer and an honest reserved state; it must not claim live retrieval or invent citations.
- `ProfileView` shows selected goal, completed lesson count, and a reset action that calls `resetProgress` only after confirmation.

- [ ] **Step 1: Write failing tests for the three surfaces**

  Test that Practice produces feedback from a draft, SEEK visibly states that live expert retrieval is not connected, Profile reflects progress, and Reset clears the local state after confirmation.

- [ ] **Step 2: Run focused tests and confirm RED**

  Run `npm test -- src/features/practice/PracticeView.test.tsx src/features/seek/SeekView.test.tsx src/features/profile/ProfileView.test.tsx` and confirm the intended failures.

- [ ] **Step 3: Implement the three feature modules**

  Keep Practice useful without pretending to be AI; show prompt, editable draft, deterministic feedback, and next-step guidance. Make SEEK’s unavailable state explicit and compact. Keep Profile focused on progress and local-demo boundaries.

- [ ] **Step 4: Verify tests and build**

  Run focused tests, full tests, and `npm run build`.

- [ ] **Step 5: Commit the remaining product surfaces**

  ```bash
  git add src/features/practice src/features/seek src/features/profile src/app/App.tsx
  git commit -m "feat: add practice seek and profile surfaces"
  ```

### Task 7: Browser QA, fidelity ledger, and publishing

**Files:**
- Create: `docs/verification/riseguide-learning-lab-fidelity-ledger.md`
- Modify: `README.md`
- Modify: `.openai/hosting.json`
- Modify: source files only if QA finds a mismatch

**Interfaces:**
- The fidelity ledger records at least five comparison points with concept evidence, render evidence, and the fix or intentional deviation.
- `.openai/hosting.json` stores the exact Sites `project_id` returned by the connector and static-directory metadata required for packaging.

- [ ] **Step 1: Write the project README**

  Document the public project name, local commands, app workflow, local-storage boundary, deferred services, and the fact that the Sites deployment is a public production URL while the source app exposes no live AI or account services.

- [ ] **Step 2: Run verification commands before browser work**

  Run:

  ```bash
  npm test
  npm run build
  git diff --check
  git status --short --branch
  ```

  Resolve all failures and commit the README/verification-ready state.

- [ ] **Step 3: Start Vite and verify in Browser/IAB**

  Load the app at desktop size, select a goal, open the next lesson, answer the quiz, complete it, navigate to Profile, reload, and confirm persistence. Then check mobile-sized layout, navigation, focus treatment, no horizontal overflow, and reduced-motion behavior.

- [ ] **Step 4: Capture the implementation screenshot and inspect it with the concept**

  Use the Browser/IAB screenshot and `view_image` on both `docs/visuals/riseguide-learning-lab-concept.png` and the latest implementation screenshot. Compare copy, layout, typography, palette, spacing/container model, asset treatment, responsive continuation, and core interaction state.

- [ ] **Step 5: Write the fidelity ledger and fix every material mismatch**

  Record at least five concrete checks. If any mismatch would receive a design-review comment, fix it, rerun tests/build, and capture a fresh screenshot.

- [ ] **Step 6: Create the public GitHub repository and push the exact source state**

  Create public repository `subhav13/riseguide-learning-lab`, set it as `origin`, push `main`, and verify the remote HEAD matches the local full SHA. If the GitHub connector cannot create repositories, use the authenticated GitHub UI or another authenticated GitHub mechanism; do not commit credentials or tokens.

- [ ] **Step 7: Create the Sites project, save the pushed version, and deploy it**

  Read `.openai/hosting.json` first. Create the Sites project only if no `project_id` exists, persist the exact opaque ID, package the built site with the Sites packaging helper, save the version using the full pushed commit SHA, deploy the saved version, and poll deployment status until `succeeded` or `failed`.

- [ ] **Step 8: Final audit**

  Confirm the public GitHub repository URL, the production Sites URL, clean worktree, exact commit SHA, passing tests/build, mobile/desktop browser evidence, and honest deferred-service labeling. Only then mark the objective complete.
