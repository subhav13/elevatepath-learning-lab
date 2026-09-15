import type { QuizQuestion } from '../data/types'

type QuizCardProps = {
  question: QuizQuestion
  selectedOptionId: string | null
  onSelectAnswer: (optionId: string) => void
}

export function QuizCard({ question, selectedOptionId, onSelectAnswer }: QuizCardProps) {
  const isAnswered = Boolean(selectedOptionId)
  const isCorrect = selectedOptionId === question.correctOptionId

  return (
    <fieldset className="quiz-card" aria-labelledby="quiz-heading">
      <legend id="quiz-heading">Check your understanding</legend>
      <p className="quiz-card__hint">Choose the best answer. You will get instant feedback.</p>
      <p className="quiz-card__question">{question.prompt}</p>
      <div className="quiz-card__options">
        {question.options.map((option) => (
          <label className={`quiz-option ${selectedOptionId === option.id ? 'quiz-option--selected' : ''}`} key={option.id}>
            <input
              type="radio"
              name={question.id}
              value={option.id}
              checked={selectedOptionId === option.id}
              onChange={() => onSelectAnswer(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {isAnswered ? (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--try-again'}`} role="status">
          <strong>{isCorrect ? 'Great choice' : 'Keep thinking'}</strong>
          <p>{question.explanation}</p>
        </div>
      ) : null}
    </fieldset>
  )
}
