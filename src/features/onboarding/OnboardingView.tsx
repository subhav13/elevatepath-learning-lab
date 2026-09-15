import type { Goal } from '../../data/types'
import { ActionButton } from '../../components/ActionButton'
import { BrandMark } from '../../components/BrandMark'

type OnboardingViewProps = {
  goals: Goal[]
  onSelectGoal: (goalId: string) => void
}

export function OnboardingView({ goals, onSelectGoal }: OnboardingViewProps) {
  return (
    <main className="onboarding">
      <div className="onboarding__inner">
        <BrandMark />
        <p className="eyebrow">Your daily communication practice</p>
        <h1>What would feel better after 15 minutes?</h1>
        <p className="onboarding__intro">Choose one direction for your first week. You can change it whenever your focus changes.</p>

        <div className="goal-grid" role="list" aria-label="Growth goals">
          {goals.map((goal, index) => (
            <div className="goal-option" role="listitem" key={goal.id}>
              <span className="goal-option__number">0{index + 1}</span>
              <div>
                <h2>{goal.label}</h2>
                <p>{goal.description}</p>
              </div>
              <ActionButton
                variant="ghost"
                type="button"
                aria-label={`Choose ${goal.label}`}
                onClick={() => onSelectGoal(goal.id)}
              >
                Start here <span aria-hidden="true">→</span>
              </ActionButton>
            </div>
          ))}
        </div>

        <p className="onboarding__fine-print">Built for small, repeatable progress. No microphone or account required for this local demo.</p>
      </div>
    </main>
  )
}
