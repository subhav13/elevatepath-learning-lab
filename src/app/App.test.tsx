import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'

describe('RiseGuide Learning Lab app shell', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows goal choices for a first-use visitor', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /what would feel better after 15 minutes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /speak with more clarity/i })).toBeInTheDocument()
  })

  it('reveals Home after a goal is selected and persists the choice', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /speak with more clarity/i }))

    expect(screen.getByRole('heading', { name: /your next 15 minutes/i })).toBeInTheDocument()
    expect(localStorage.getItem('riseguide-learning-lab.progress.v1')).toContain('speak-clearly')
  })

  it('changes the active destination through accessible navigation', async () => {
    const user = userEvent.setup()
    localStorage.setItem(
      'riseguide-learning-lab.progress.v1',
      JSON.stringify({ version: 1, selectedGoalId: 'speak-clearly', completedLessonIds: [], practiceDraft: '' }),
    )
    render(<App />)

    await user.click(screen.getByRole('button', { name: /^Practice$/i }))

    expect(screen.getByRole('heading', { name: /^Practice$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Practice$/i })).toHaveAttribute('aria-current', 'page')
  })
})
