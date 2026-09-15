export type PracticeFeedback = {
  title: string
  message: string
  nextStep: string
}

export function buildPracticeFeedback(draft: string): PracticeFeedback {
  const trimmed = draft.trim()
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0

  if (wordCount === 0) {
    return {
      title: 'Start with one clear idea',
      message: 'A strong introduction becomes easier when you give yourself a simple starting point.',
      nextStep: 'Try: who you are, what you do, and what you are curious about.',
    }
  }

  if (wordCount < 8) {
    return {
      title: 'Add one useful detail',
      message: 'You have a friendly opening. Give the listener one detail they can respond to.',
      nextStep: 'Add the kind of work you do or a current project you enjoy.',
    }
  }

  return {
    title: 'Strong foundation',
    message: 'You covered who you are, what you do, and a detail that opens the conversation.',
    nextStep: 'Try it once more with a slightly shorter final sentence.',
  }
}
