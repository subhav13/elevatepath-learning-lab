import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { communicationJourney } from '../../data/content'
import { DEFAULT_PROGRESS } from '../../lib/progress'
import { HomeView } from './HomeView'

describe('HomeView', () => {
  it('shows the first incomplete lesson as the next practice', () => {
    render(
      <HomeView
        journey={communicationJourney}
        progress={DEFAULT_PROGRESS}
        onOpenLesson={vi.fn()}
        onNavigate={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: /your next 15 minutes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue lesson.*start with presence/i })).toBeInTheDocument()
  })

  it('moves to the next lesson after the current lesson is complete', () => {
    render(
      <HomeView
        journey={communicationJourney}
        progress={{ ...DEFAULT_PROGRESS, completedLessonIds: ['lesson-1'] }}
        onOpenLesson={vi.fn()}
        onNavigate={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: /continue lesson.*introduce yourself with confidence/i })).toBeInTheDocument()
    expect(screen.getByText(/1 of 5 lessons complete/i)).toBeInTheDocument()
  })
})
