export type Goal = {
  id: string
  label: string
  description: string
}

export type QuizOption = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: QuizOption[]
  correctOptionId: string
  explanation: string
}

export type Lesson = {
  id: string
  order: number
  title: string
  subtitle: string
  durationMinutes: number
  summary: string
  outcomes: string[]
  sections: Array<{ heading: string; body: string }>
  exercisePrompt: string
  quiz: QuizQuestion
}

export type Journey = {
  id: string
  title: string
  category: string
  description: string
  lessonCount: number
  lessons: Lesson[]
}

export type PracticePrompt = {
  id: string
  title: string
  prompt: string
  hints: string[]
}
