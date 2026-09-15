import { ArrowLeft, CheckCircle2, Clock3 } from 'lucide-react'
import { useState } from 'react'
import type { Lesson } from '../../data/types'
import type { ProgressState } from '../../lib/progress'
import { ActionButton } from '../../components/ActionButton'
import { QuizCard } from '../../components/QuizCard'

type LessonViewProps = {
  lesson: Lesson
  progress: ProgressState
  onCompleteLesson: (lessonId: string) => void
  onBack: () => void
}

export function LessonView({ lesson, progress, onCompleteLesson, onBack }: LessonViewProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const isCompleted = progress.completedLessonIds.includes(lesson.id)

  function handleComplete() {
    if (selectedOptionId && !isCompleted) onCompleteLesson(lesson.id)
  }

  return (
    <section className="feature-view lesson-view" aria-labelledby="lesson-heading">
      <button className="back-link" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" size={16} /> Back to journey</button>
      <div className="lesson-view__header">
        <div>
          <p className="eyebrow">Lesson {lesson.order} · Communication</p>
          <h1 id="lesson-heading">{lesson.title}</h1>
          <p className="feature-view__lead">{lesson.subtitle}. {lesson.summary}</p>
        </div>
        <span className="lesson-duration"><Clock3 aria-hidden="true" size={16} /> {lesson.durationMinutes} min</span>
      </div>

      <div className="lesson-view__layout">
        <article className="lesson-content">
          {lesson.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <div className="exercise-panel">
            <p className="panel-kicker">Try this now</p>
            <p>{lesson.exercisePrompt}</p>
          </div>
        </article>

        <aside className="lesson-quiz-column">
          <QuizCard question={lesson.quiz} selectedOptionId={selectedOptionId} onSelectAnswer={setSelectedOptionId} />
          <ActionButton type="button" disabled={!selectedOptionId || isCompleted} onClick={handleComplete}>
            {isCompleted ? <><CheckCircle2 aria-hidden="true" size={17} /> Lesson complete</> : 'Mark lesson complete'}
          </ActionButton>
        </aside>
      </div>
    </section>
  )
}
