import { ArrowUpRight, Search, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { ActionButton } from '../../components/ActionButton'

type SeekViewProps = {
  onNotify: () => void
}

export function SeekView({ onNotify }: SeekViewProps) {
  const [isInterested, setIsInterested] = useState(false)

  function handleNotify() {
    onNotify()
    setIsInterested(true)
  }

  return (
    <section className="feature-view seek-view" aria-labelledby="seek-heading">
      <div className="seek-view__hero">
        <div>
          <p className="eyebrow">Curated guidance, when you need it</p>
          <h1 id="seek-heading">SEEK</h1>
          <p className="feature-view__lead">Expert search is coming soon. We&apos;re designing a calm way to find communication guidance you can trust.</p>
        </div>
        <div className="seek-view__orb" aria-hidden="true"><Search size={38} /></div>
      </div>

      <div className="seek-grid">
        <article className="seek-card seek-card--primary">
          <span className="seek-card__icon"><Search aria-hidden="true" size={19} /></span>
          <h2>Ask a better question</h2>
          <p>SEEK will bring together concise answers, source context, and practical next steps without turning every moment into a research project.</p>
          <ActionButton type="button" variant={isInterested ? 'secondary' : 'primary'} onClick={handleNotify}>
            {isInterested ? 'You are on the list' : 'Keep me posted'} <ArrowUpRight aria-hidden="true" size={16} />
          </ActionButton>
          {isInterested ? <span className="seek-card__confirmation" role="status">We&apos;ll keep this local until expert search is connected.</span> : null}
        </article>
        <article className="seek-card">
          <span className="seek-card__icon seek-card__icon--quiet"><ShieldCheck aria-hidden="true" size={19} /></span>
          <h2>Built for trust</h2>
          <p>When this surface opens, citations and editorial guardrails will be part of the experience—not hidden afterthoughts.</p>
        </article>
      </div>
    </section>
  )
}
