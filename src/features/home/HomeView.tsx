import { ArrowRight, Clock3, Flame, Sparkles } from 'lucide-react'
import type { Journey } from '../../data/types'
import type { ProgressState } from '../../lib/progress'
import type { ViewName } from '../../app/viewTypes'
import { ActionButton } from '../../components/ActionButton'
import { ProgressBar } from '../../components/ProgressBar'
import { SectionHeading } from '../../components/SectionHeading'
import { LessonRow } from '../../components/LessonRow'

type HomeViewProps = {
  journey: Journey
  progress: ProgressState
  onOpenLesson: (lessonId: string) => void
  onNavigate: (view: ViewName) => void
}

export function HomeView({ journey, progress, onOpenLesson, onNavigate }: HomeViewProps) {
  const completedCount = journey.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length
  const nextLesson = journey.lessons.find((lesson) => !progress.completedLessonIds.includes(lesson.id)) ?? journey.lessons[journey.lessons.length - 1]

  return (
    <section className="feature-view home-view" aria-labelledby="home-heading">
      <div className="feature-view__intro">
        <div>
          <p className="eyebrow">Today&apos;s practice</p>
          <h1 id="home-heading">Your next 15 minutes</h1>
          <p className="feature-view__lead">A focused lesson to build real-world communication skills.</p>
        </div>
        <div className="streak-summary">
          <Flame aria-hidden="true" size={22} />
          <span>Keep going</span>
          <strong>6 day streak</strong>
          <div className="streak-dots" aria-label="6 day streak">
            {[0, 1, 2, 3, 4, 5].map((day) => <span className={day < 4 ? 'streak-dot streak-dot--active' : 'streak-dot'} key={day} />)}
          </div>
        </div>
      </div>

      <div className="home-grid">
        <aside className="journey-panel">
          <div className="journey-panel__header">
            <div>
              <p className="panel-kicker">Current journey</p>
              <h2>{journey.title}</h2>
            </div>
            <span className="journey-panel__count">{completedCount}/{journey.lessonCount}</span>
          </div>
          <ProgressBar value={completedCount} max={journey.lessonCount} label="Communication journey progress" />
          <p className="journey-panel__progress-copy">{completedCount} of {journey.lessonCount} lessons complete</p>
          <div className="journey-panel__list">
            {journey.lessons.map((lesson) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                isCompleted={progress.completedLessonIds.includes(lesson.id)}
                isLocked={lesson.order > 1 && !progress.completedLessonIds.includes(journey.lessons[lesson.order - 2].id)}
                onOpen={onOpenLesson}
              />
            ))}
          </div>
        </aside>

        <article className="next-lesson-card">
          <div className="next-lesson-card__meta">
            <span>Lesson {nextLesson.order} of {journey.lessonCount}</span>
            <span><Clock3 aria-hidden="true" size={15} /> {nextLesson.durationMinutes} min</span>
          </div>
          <div className="lesson-illustration" aria-hidden="true"><Sparkles size={32} /></div>
          <h2>{nextLesson.title}</h2>
          <p className="next-lesson-card__summary">{nextLesson.summary}</p>
          <div className="outcome-list">
            <strong>In this lesson, you&apos;ll learn:</strong>
            {nextLesson.outcomes.map((outcome) => <span key={outcome}><span aria-hidden="true">✓</span>{outcome}</span>)}
          </div>
          <div className="next-lesson-card__actions">
            <ActionButton type="button" aria-label={`Continue lesson: ${nextLesson.title}`} onClick={() => onOpenLesson(nextLesson.id)}>
              Continue lesson <ArrowRight aria-hidden="true" size={17} />
            </ActionButton>
            <ActionButton variant="secondary" type="button" onClick={() => onNavigate('practice')}>
              Practice this
            </ActionButton>
          </div>
        </article>
      </div>

      <div className="home-section-heading">
        <SectionHeading title="Keep the momentum" description="A small action today makes the next real conversation feel lighter." />
        <ActionButton variant="ghost" type="button" onClick={() => onNavigate('learn')}>View journey <ArrowRight aria-hidden="true" size={16} /></ActionButton>
      </div>
    </section>
  )
}
