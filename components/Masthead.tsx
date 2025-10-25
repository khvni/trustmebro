import Link from 'next/link'

export default function Masthead() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="masthead">
      <div className="masthead-top">
        <div className="masthead-meta">Est. 2024</div>
        <div className="masthead-meta">{today}</div>
        <div className="masthead-meta">Vol. I, No. ∞</div>
      </div>

      <Link href="/" className="masthead-title-link">
        <h1 className="masthead-title">The Trustmebro Times</h1>
      </Link>

      <div className="masthead-tagline">
        "All the News That's Totally Real"
      </div>

      <nav className="masthead-nav">
        <Link href="/">Write</Link>
        <span className="nav-divider">|</span>
        <Link href="/articles">All Stories</Link>
      </nav>
    </header>
  )
}
