import { beforeEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_PROGRESS,
  completeLesson,
  loadProgress,
  resetProgress,
  saveProgress,
  type ProgressState,
} from './progress'

describe('local progress store', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the default state when storage is empty', () => {
    expect(loadProgress(localStorage)).toEqual(DEFAULT_PROGRESS)
  })

  it('round-trips selected goal and completed lessons through storage', () => {
    const state: ProgressState = completeLesson(
      { ...DEFAULT_PROGRESS, selectedGoalId: 'speak-clearly' },
      'lesson-1',
    )

    saveProgress(localStorage, state)

    expect(loadProgress(localStorage)).toEqual(state)
  })

  it('does not add the same lesson twice', () => {
    const state = completeLesson(completeLesson(DEFAULT_PROGRESS, 'lesson-1'), 'lesson-1')

    expect(state.completedLessonIds).toEqual(['lesson-1'])
  })

  it('resets only the local learning state', () => {
    saveProgress(localStorage, completeLesson(DEFAULT_PROGRESS, 'lesson-1'))

    expect(resetProgress(localStorage)).toEqual(DEFAULT_PROGRESS)
    expect(loadProgress(localStorage)).toEqual(DEFAULT_PROGRESS)
  })

  it('falls back to defaults when stored data is malformed', () => {
    localStorage.setItem('riseguide-learning-lab.progress.v1', '{bad json')

    expect(loadProgress(localStorage)).toEqual(DEFAULT_PROGRESS)
  })
})
