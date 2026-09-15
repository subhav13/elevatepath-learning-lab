import type { LucideIcon } from 'lucide-react'
import { BookOpen, House, Search, Sparkles, UserRound } from 'lucide-react'
import type { ViewName } from '../app/viewTypes'

type BottomNavProps = {
  activeView: ViewName
  onNavigate: (view: ViewName) => void
}

type NavItem = {
  id: ViewName
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Sparkles },
  { id: 'seek', label: 'SEEK', icon: Search },
  { id: 'profile', label: 'Profile', icon: UserRound },
]

export function BottomNav({ activeView, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`nav-item ${activeView === id ? 'nav-item--active' : ''}`}
          type="button"
          aria-current={activeView === id ? 'page' : undefined}
          onClick={() => onNavigate(id)}
        >
          <Icon aria-hidden="true" size={19} strokeWidth={activeView === id ? 2.4 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
