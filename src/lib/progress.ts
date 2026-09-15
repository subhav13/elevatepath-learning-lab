export const PROGRESS_STORAGE_KEY = 'riseguide-learning-lab.progress.v1'

export type ProgressState = {
  version: 1
  selectedGoalId: string | null
  completedLessonIds: string[]
  practiceDraft: string
}

export const DEFAULT_PROGRESS: ProgressState = {
  version: 1,
  selectedGoalId: null,
  completedLessonIds: [],
  practiceDraft: '',
}

function createDefaultProgress(): ProgressState {
  return {
    version: DEFAULT_PROGRESS.version,
    selectedGoalId: DEFAULT_PROGRESS.selectedGoalId,
    completedLessonIds: [],
    practiceDraft: DEFAULT_PROGRESS.practiceDraft,
  }
}

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<ProgressState>
  return (
    candidate.version === 1 &&
    (candidate.selectedGoalId === null || typeof candidate.selectedGoalId === 'string') &&
    Array.isArray(candidate.completedLessonIds) &&
    candidate.completedLessonIds.every((id) => typeof id === 'string') &&
    typeof candidate.practiceDraft === 'string'
  )
}

export function loadProgress(storage: Storage): ProgressState {
  const stored = storage.getItem(PROGRESS_STORAGE_KEY)
  if (!stored) return createDefaultProgress()

  try {
    const parsed: unknown = JSON.parse(stored)
    return isProgressState(parsed)
      ? { ...parsed, completedLessonIds: [...parsed.completedLessonIds] }
      : createDefaultProgress()
  } catch {
    return createDefaultProgress()
  }
}

export function saveProgress(storage: Storage, state: ProgressState): void {
  storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state))
}

export function resetProgress(storage: Storage): ProgressState {
  storage.removeItem(PROGRESS_STORAGE_KEY)
  return createDefaultProgress()
}

export function completeLesson(state: ProgressState, lessonId: string): ProgressState {
  if (state.completedLessonIds.includes(lessonId)) return state

  return {
    ...state,
    completedLessonIds: [...state.completedLessonIds, lessonId],
  }
}

export function selectGoal(state: ProgressState, goalId: string): ProgressState {
  return { ...state, selectedGoalId: goalId }
}

export function savePracticeDraft(state: ProgressState, practiceDraft: string): ProgressState {
  return { ...state, practiceDraft }
}
