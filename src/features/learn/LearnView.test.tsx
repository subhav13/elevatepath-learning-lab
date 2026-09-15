import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { communicationJourney } from '../../data/content'
import { DEFAULT_PROGRESS } from '../../lib/progress'
import { LearnView } from './LearnView'

describe('LearnView', () => {
  it('unlocks only the first lesson for a new learner', () => {
    render(<LearnView journey={communicationJourney} progress={DEFAULT_PROGRESS} onOpenLesson={vi.fn()} />)

    expect(screen.getByRole('button', { name: /start with presence/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /introduce yourself with confidence/i })).toBeDisabled()
  })

  it('unlocks the next lesson after the previous lesson is complete', () => {
    render(
      <LearnView
        journey={communicationJourney}
        progress={{ ...DEFAULT_PROGRESS, completedLessonIds: ['lesson-1'] }}
        onOpenLesson={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /introduce yourself with confidence/i })).toBeEnabled()
    expect(screen.getByText(/completed/i)).toBeInTheDocument()
  })
})
