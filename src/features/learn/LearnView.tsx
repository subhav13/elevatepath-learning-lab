import { ArrowLeft, BookOpenCheck } from 'lucide-react'
import type { Journey } from '../../data/types'
import type { ProgressState } from '../../lib/progress'
import { ProgressBar } from '../../components/ProgressBar'
import { LessonRow } from '../../components/LessonRow'

type LearnViewProps = {
  journey: Journey
  progress: ProgressState
  onOpenLesson: (lessonId: string) => void
}

export function LearnView({ journey, progress, onOpenLesson }: LearnViewProps) {
  const completedCount = journey.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length

  return (
    <section className="feature-view learn-view" aria-labelledby="learn-heading">
      <div className="learn-view__header">
        <div>
          <p className="eyebrow">Build the skill step by step</p>
          <h1 id="learn-heading">{journey.title}</h1>
          <p className="feature-view__lead">{journey.description}</p>
        </div>
        <div className="learn-view__badge"><BookOpenCheck aria-hidden="true" size={20} /><span>{journey.lessonCount} lessons</span></div>
      </div>

      <div className="learn-progress-panel">
        <div>
          <strong>{completedCount} of {journey.lessonCount} lessons complete</strong>
          <span>Keep a steady pace. There is no perfect day to begin.</span>
        </div>
        <ProgressBar value={completedCount} max={journey.lessonCount} label="Journey progress" />
      </div>

      <div className="learn-list" aria-label={`${journey.title} lessons`}>
        {journey.lessons.map((lesson, index) => (
          <div className="learn-list__item" key={lesson.id}>
            {index > 0 ? <ArrowLeft className="learn-list__connector" aria-hidden="true" size={17} /> : null}
            <LessonRow
              lesson={lesson}
              isCompleted={progress.completedLessonIds.includes(lesson.id)}
              isLocked={index > 0 && !progress.completedLessonIds.includes(journey.lessons[index - 1].id)}
              onOpen={onOpenLesson}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
