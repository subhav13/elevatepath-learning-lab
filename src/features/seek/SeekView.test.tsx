import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { SeekView } from './SeekView'

describe('SeekView', () => {
  it('explains the upcoming expert guidance surface and captures interest locally', async () => {
    const user = userEvent.setup()
    const onNotify = vi.fn()

    render(<SeekView onNotify={onNotify} />)

    expect(screen.getByRole('heading', { name: 'SEEK' })).toBeInTheDocument()
    expect(screen.getByText(/expert search is coming soon/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /keep me posted/i }))
    expect(onNotify).toHaveBeenCalledOnce()
    expect(screen.getByText(/we'll keep this local/i)).toBeInTheDocument()
  })
})
