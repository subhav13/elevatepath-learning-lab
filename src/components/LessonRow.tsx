import { ArrowRight, Check, LockKeyhole } from 'lucide-react'
import type { Lesson } from '../data/types'

type LessonRowProps = {
  lesson: Lesson
  isCompleted: boolean
  isLocked: boolean
  onOpen: (lessonId: string) => void
}

export function LessonRow({ lesson, isCompleted, isLocked, onOpen }: LessonRowProps) {
  return (
    <div className={`lesson-row ${isCompleted ? 'lesson-row--completed' : ''} ${isLocked ? 'lesson-row--locked' : ''}`}>
      <span className="lesson-row__number" aria-hidden="true">
        {isCompleted ? <Check size={16} strokeWidth={3} /> : lesson.order}
      </span>
      <div className="lesson-row__copy">
        <strong>{lesson.title}</strong>
        <span>{lesson.subtitle}</span>
      </div>
      <button
        className="lesson-row__action"
        type="button"
        disabled={isLocked}
        aria-label={isLocked ? `${lesson.title} (locked)` : lesson.title}
        onClick={() => onOpen(lesson.id)}
      >
        {isLocked ? <LockKeyhole aria-hidden="true" size={16} /> : <ArrowRight aria-hidden="true" size={17} />}
      </button>
      <span className="sr-only">
        {isCompleted ? 'Completed' : isLocked ? 'Locked until the previous lesson is complete' : 'Available'}
      </span>
    </div>
  )
}
