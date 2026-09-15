import { describe, expect, it } from 'vitest'
import { buildPracticeFeedback } from './practice'

describe('practice feedback', () => {
  it('gives a starting prompt for an empty draft', () => {
    expect(buildPracticeFeedback('')).toEqual({
      title: 'Start with one clear idea',
      message: 'A strong introduction becomes easier when you give yourself a simple starting point.',
      nextStep: 'Try: who you are, what you do, and what you are curious about.',
    })
  })

  it('asks for more substance when a draft is too short', () => {
    expect(buildPracticeFeedback('Hi, I am Alex.')).toEqual({
      title: 'Add one useful detail',
      message: 'You have a friendly opening. Give the listener one detail they can respond to.',
      nextStep: 'Add the kind of work you do or a current project you enjoy.',
    })
  })

  it('recognizes a clear three-part introduction', () => {
    expect(
      buildPracticeFeedback(
        'Hi, I am Alex. I design learning tools for small teams. I am curious about how people build better habits.',
      ),
    ).toEqual({
      title: 'Strong foundation',
      message: 'You covered who you are, what you do, and a detail that opens the conversation.',
      nextStep: 'Try it once more with a slightly shorter final sentence.',
    })
  })
})
