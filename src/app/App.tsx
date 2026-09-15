import { useMemo, useState } from 'react'
import { communicationJourney, goals } from '../data/content'
import { AppShell } from '../components/AppShell'
import { OnboardingView } from '../features/onboarding/OnboardingView'
import type { ViewName } from './viewTypes'
import { loadProgress, saveProgress, selectGoal, type ProgressState } from '../lib/progress'

const viewCopy: Record<ViewName, { eyebrow: string; title: string; body: string }> = {
  home: {
    eyebrow: 'Today\'s practice',
    title: 'Your next 15 minutes',
    body: 'A focused lesson to build real-world communication skills.',
  },
  learn: {
    eyebrow: 'Your journey',
    title: 'Learn',
    body: 'Follow a small sequence of lessons that build on each other.',
  },
  practice: {
    eyebrow: 'Turn knowledge into confidence',
    title: 'Practice',
    body: 'Rehearse one idea in your own words before the moment arrives.',
  },
  seek: {
    eyebrow: 'Expert guidance, thoughtfully curated',
    title: 'SEEK',
    body: 'A future home for concise answers grounded in trusted communication sources.',
  },
  profile: {
    eyebrow: 'Your local learning space',
    title: 'Profile',
    body: 'Keep an eye on your progress and the focus you chose for this week.',
  },
}

function PlaceholderView({ activeView, progress }: { activeView: ViewName; progress: ProgressState }) {
  const copy = viewCopy[activeView]
  const completion = progress.completedLessonIds.length

  return (
    <section className={`placeholder-view placeholder-view--${activeView}`}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="placeholder-view__body">{copy.body}</p>
      {activeView === 'home' ? (
        <div className="placeholder-view__preview">
          <span>Communication journey</span>
          <strong>{completion} of {communicationJourney.lessonCount} lessons complete</strong>
        </div>
      ) : null}
    </section>
  )
}

export function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(window.localStorage))
  const [activeView, setActiveView] = useState<ViewName>('home')
  const selectedGoal = useMemo(() => goals.find((goal) => goal.id === progress.selectedGoalId), [progress.selectedGoalId])

  function handleSelectGoal(goalId: string) {
    const nextProgress = selectGoal(progress, goalId)
    setProgress(nextProgress)
    saveProgress(window.localStorage, nextProgress)
  }

  if (!selectedGoal) {
    return <OnboardingView goals={goals} onSelectGoal={handleSelectGoal} />
  }

  return (
    <AppShell
      activeView={activeView}
      onNavigate={setActiveView}
      progressSummary={{ completed: progress.completedLessonIds.length, total: communicationJourney.lessonCount }}
    >
      <PlaceholderView activeView={activeView} progress={progress} />
    </AppShell>
  )
}
