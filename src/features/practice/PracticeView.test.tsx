import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { DEFAULT_PROGRESS } from '../../lib/progress'
import { PracticeView } from './PracticeView'

describe('PracticeView', () => {
  it('lets a learner write a response and get local feedback', async () => {
    const user = userEvent.setup()
    const onSaveDraft = vi.fn()

    render(<PracticeView progress={DEFAULT_PROGRESS} onSaveDraft={onSaveDraft} />)

    expect(screen.getByRole('heading', { name: 'Practice' })).toBeInTheDocument()
    expect(screen.getByText(/your 20-second introduction/i)).toBeInTheDocument()

    await user.type(screen.getByRole('textbox', { name: /your response/i }), 'I am Alex and I help early teams with marketing.')
    expect(onSaveDraft).toHaveBeenLastCalledWith('I am Alex and I help early teams with marketing.')

    await user.click(screen.getByRole('button', { name: /reflect on this/i }))
    expect(screen.getByText(/strong foundation/i)).toBeInTheDocument()
  })
})
