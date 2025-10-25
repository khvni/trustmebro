import Masthead from '@/components/Masthead'
import InputForm from '@/components/InputForm'

export default function HomePage() {
  return (
    <div className="container">
      <Masthead />
      <main className="main-content">
        <InputForm />
      </main>
      <footer className="footer">
        <p>© 2024 The Trustmebro Times. All rights reserved (probably).</p>
      </footer>
    </div>
  )
}
