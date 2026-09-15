import { Check, Lightbulb, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { practicePrompts } from '../../data/content'
import type { ProgressState } from '../../lib/progress'
import { buildPracticeFeedback, type PracticeFeedback } from '../../lib/practice'
import { ActionButton } from '../../components/ActionButton'

type PracticeViewProps = {
  progress: ProgressState
  onSaveDraft: (draft: string) => void
}

export function PracticeView({ progress, onSaveDraft }: PracticeViewProps) {
  const prompt = practicePrompts[0]
  const [draft, setDraft] = useState(progress.practiceDraft)
  const [feedback, setFeedback] = useState<PracticeFeedback | null>(null)

  function handleDraftChange(value: string) {
    setDraft(value)
    onSaveDraft(value)
    setFeedback(null)
  }

  return (
    <section className="feature-view practice-view" aria-labelledby="practice-heading">
      <div className="feature-view__intro">
        <div>
          <p className="eyebrow">Turn insight into confidence</p>
          <h1 id="practice-heading">Practice</h1>
          <p className="feature-view__lead">Say it in your own words. A low-stakes rehearsal makes the real moment feel more familiar.</p>
        </div>
        <div className="practice-view__mark" aria-hidden="true"><Sparkles size={28} /></div>
      </div>

      <div className="practice-layout">
        <article className="practice-prompt-card">
          <p className="panel-kicker">One prompt, one small rep</p>
          <h2>{prompt.title}</h2>
          <p>{prompt.prompt}</p>
          <div className="practice-hints">
            {prompt.hints.map((hint) => <span key={hint}><Check aria-hidden="true" size={14} /> {hint}</span>)}
          </div>
        </article>

        <article className="practice-editor-card">
          <label className="field-label" htmlFor="practice-response">Your response</label>
          <textarea
            id="practice-response"
            value={draft}
            onChange={(event) => handleDraftChange(event.target.value)}
            placeholder="Write the way you would actually say it..."
            rows={8}
          />
          <div className="practice-editor-card__footer">
            <span>{draft.trim() ? `${draft.trim().split(/\s+/).length} words` : 'Saved locally as you type'}</span>
            <ActionButton type="button" onClick={() => setFeedback(buildPracticeFeedback(draft))}>Reflect on this <Sparkles aria-hidden="true" size={16} /></ActionButton>
          </div>
          {feedback ? (
            <div className="practice-feedback" role="status">
              <Lightbulb aria-hidden="true" size={20} />
              <div>
                <strong>{feedback.title}</strong>
                <p>{feedback.message}</p>
                <span>{feedback.nextStep}</span>
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  )
}
