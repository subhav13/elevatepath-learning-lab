import { RotateCcw, Target, UserRound } from 'lucide-react'
import type { Goal } from '../../data/types'
import type { ProgressState } from '../../lib/progress'
import { ActionButton } from '../../components/ActionButton'

type ProfileViewProps = {
  goal?: Goal
  progress: ProgressState
  totalLessons?: number
  onReset: () => void
}

export function ProfileView({ goal, progress, totalLessons = 5, onReset }: ProfileViewProps) {
  return (
    <section className="feature-view profile-view" aria-labelledby="profile-heading">
      <div className="feature-view__intro">
        <div>
          <p className="eyebrow">Your local learning space</p>
          <h1 id="profile-heading">Profile</h1>
          <p className="feature-view__lead">A simple snapshot of what you&apos;re practicing and the progress you&apos;ve made.</p>
        </div>
        <div className="profile-avatar" aria-hidden="true"><UserRound size={28} /></div>
      </div>

      <div className="profile-grid">
        <article className="profile-card profile-card--goal">
          <span className="profile-card__icon"><Target aria-hidden="true" size={19} /></span>
          <p className="panel-kicker">This week&apos;s focus</p>
          <h2>{goal?.label ?? 'Choose a focus to begin'}</h2>
          <p>{goal?.description ?? 'Pick one small direction from onboarding and RiseGuide will keep the practice focused.'}</p>
        </article>
        <article className="profile-card profile-card--progress">
          <p className="panel-kicker">Your progress</p>
          <strong>{progress.completedLessonIds.length} of {totalLessons} lessons complete</strong>
          <p>Progress is saved on this device for now.</p>
        </article>
      </div>

      <div className="profile-reset-card">
        <div>
          <p className="panel-kicker">Local-only controls</p>
          <h2>Start fresh</h2>
          <p>Resetting clears your goal, completed lessons, and practice draft from this device.</p>
        </div>
        <ActionButton type="button" variant="ghost" onClick={onReset}><RotateCcw aria-hidden="true" size={16} /> Reset local progress</ActionButton>
      </div>
    </section>
  )
}
