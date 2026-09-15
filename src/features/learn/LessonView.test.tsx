import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { communicationJourney } from '../../data/content'
import { DEFAULT_PROGRESS } from '../../lib/progress'
import { LessonView } from './LessonView'

describe('LessonView', () => {
  it('shows the lesson quiz and keeps completion disabled before an answer', () => {
    render(
      <LessonView
        lesson={communicationJourney.lessons[0]}
        progress={DEFAULT_PROGRESS}
        onCompleteLesson={vi.fn()}
        onBack={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: /start with presence/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /check your understanding/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mark lesson complete/i })).toBeDisabled()
  })

  it('reveals answer feedback and allows completion after an answer', async () => {
    const user = userEvent.setup()
    const onCompleteLesson = vi.fn()

    render(
      <LessonView
        lesson={communicationJourney.lessons[0]}
        progress={DEFAULT_PROGRESS}
        onCompleteLesson={onCompleteLesson}
        onBack={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('radio', { name: /to create a clear starting point/i }))

    expect(screen.getByText(/a brief pause helps you choose a direction/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mark lesson complete/i })).toBeEnabled()

    await user.click(screen.getByRole('button', { name: /mark lesson complete/i }))

    expect(onCompleteLesson).toHaveBeenCalledWith('lesson-1')
  })
})
