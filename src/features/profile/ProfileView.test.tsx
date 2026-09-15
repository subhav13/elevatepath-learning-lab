import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { goals } from '../../data/content'
import { DEFAULT_PROGRESS } from '../../lib/progress'
import { ProfileView } from './ProfileView'

describe('ProfileView', () => {
  it('shows local progress and offers a reset action', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    const progress = { ...DEFAULT_PROGRESS, selectedGoalId: goals[0].id, completedLessonIds: ['lesson-1', 'lesson-2'] }

    render(<ProfileView goal={goals[0]} progress={progress} onReset={onReset} />)

    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByText(goals[0].label)).toBeInTheDocument()
    expect(screen.getByText(/2 of 5 lessons complete/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /reset local progress/i }))
    expect(onReset).toHaveBeenCalledOnce()
  })
})
