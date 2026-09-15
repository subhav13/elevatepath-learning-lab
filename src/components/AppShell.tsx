import type { ReactNode } from 'react'
import { Flame } from 'lucide-react'
import type { ViewName } from '../app/viewTypes'
import { BrandMark } from './BrandMark'
import { BottomNav } from './BottomNav'

type AppShellProps = {
  activeView: ViewName
  onNavigate: (view: ViewName) => void
  progressSummary: { completed: number; total: number }
  children: ReactNode
}

export function AppShell({ activeView, onNavigate, progressSummary, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__rail" aria-label="ElevatePath Learning Lab">
        <BrandMark />
        <p className="app-shell__rail-note">Small lessons. Real conversations. A more confident you.</p>
      </aside>

      <div className="app-shell__body">
        <header className="app-shell__header">
          <div className="app-shell__mobile-brand">
            <BrandMark />
          </div>
          <div className="app-shell__header-meta">
            <span className="streak-chip"><Flame aria-hidden="true" size={16} /> 6 day streak</span>
            <span className="avatar" aria-label="Profile for JD">JD</span>
          </div>
        </header>

        <main className="app-shell__main">{children}</main>
      </div>

      <div className="app-shell__nav">
        <BottomNav activeView={activeView} onNavigate={onNavigate} />
        <p className="app-shell__progress-note">{progressSummary.completed}/{progressSummary.total} lessons complete</p>
      </div>
    </div>
  )
}
