import Link from 'next/link'
import Masthead from '@/components/Masthead'

export default function NotFound() {
  return (
    <div className="container">
      <Masthead />
      <main className="main-content">
        <div className="not-found">
          <h1>404 - Story Not Found</h1>
          <p>This article appears to have been retracted. Or maybe it never existed.</p>
          <Link href="/articles" className="back-link">
            View All Stories
          </Link>
        </div>
      </main>
    </div>
  )
}
