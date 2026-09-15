import { useMemo, useState } from 'react'
import { communicationJourney, goals } from '../data/content'
import { AppShell } from '../components/AppShell'
import { OnboardingView } from '../features/onboarding/OnboardingView'
import { HomeView } from '../features/home/HomeView'
import { LearnView } from '../features/learn/LearnView'
import { LessonView } from '../features/learn/LessonView'
import { PracticeView } from '../features/practice/PracticeView'
import { SeekView } from '../features/seek/SeekView'
import { ProfileView } from '../features/profile/ProfileView'
import type { ViewName } from './viewTypes'
import { completeLesson, loadProgress, resetProgress, savePracticeDraft, saveProgress, selectGoal, type ProgressState } from '../lib/progress'

export function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(window.localStorage))
  const [activeView, setActiveView] = useState<ViewName>('home')
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const selectedGoal = useMemo(() => goals.find((goal) => goal.id === progress.selectedGoalId), [progress.selectedGoalId])

  function handleSelectGoal(goalId: string) {
    const nextProgress = selectGoal(progress, goalId)
    setProgress(nextProgress)
    saveProgress(window.localStorage, nextProgress)
  }

  function handleNavigate(view: ViewName) {
    setActiveView(view)
    if (view !== 'learn') setActiveLessonId(null)
  }

  function handleOpenLesson(lessonId: string) {
    setActiveLessonId(lessonId)
    setActiveView('learn')
  }

  function handleCompleteLesson(lessonId: string) {
    const nextProgress = completeLesson(progress, lessonId)
    setProgress(nextProgress)
    saveProgress(window.localStorage, nextProgress)
  }

  function handleSavePracticeDraft(draft: string) {
    const nextProgress = savePracticeDraft(progress, draft)
    setProgress(nextProgress)
    saveProgress(window.localStorage, nextProgress)
  }

  function handleResetProgress() {
    const nextProgress = resetProgress(window.localStorage)
    setProgress(nextProgress)
    setActiveView('home')
    setActiveLessonId(null)
  }

  function renderActiveView() {
    if (activeView === 'home') {
      return <HomeView journey={communicationJourney} progress={progress} onOpenLesson={handleOpenLesson} onNavigate={handleNavigate} />
    }

    if (activeView === 'learn') {
      if (activeLessonId) {
        const lesson = communicationJourney.lessons.find((item) => item.id === activeLessonId)
        if (lesson) return <LessonView lesson={lesson} progress={progress} onCompleteLesson={handleCompleteLesson} onBack={() => setActiveLessonId(null)} />
      }
      return <LearnView journey={communicationJourney} progress={progress} onOpenLesson={handleOpenLesson} />
    }

    if (activeView === 'practice') return <PracticeView progress={progress} onSaveDraft={handleSavePracticeDraft} />
    if (activeView === 'seek') return <SeekView onNotify={() => undefined} />
    if (activeView === 'profile') return <ProfileView goal={selectedGoal} progress={progress} totalLessons={communicationJourney.lessonCount} onReset={handleResetProgress} />

    return null
  }

  if (!selectedGoal) {
    return <OnboardingView goals={goals} onSelectGoal={handleSelectGoal} />
  }

  return (
    <AppShell
      activeView={activeView}
      onNavigate={handleNavigate}
      progressSummary={{ completed: progress.completedLessonIds.length, total: communicationJourney.lessonCount }}
    >
      {renderActiveView()}
    </AppShell>
  )
}
