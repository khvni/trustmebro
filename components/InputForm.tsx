'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InputForm() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate article')
      }

      // Redirect to the new article
      router.push(`/article/${data.slug}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="input-form-container">
      <h2 className="input-form-title">Generate Your Story</h2>
      <p className="input-form-description">
        Tell us about your mundane day, and we'll turn it into breaking news.
      </p>

      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your day in a few bullet points...&#10;&#10;Example:&#10;• Missed my bus this morning&#10;• Spilled coffee on my shirt&#10;• Finally cleaned my room"
          className="input-textarea"
          rows={8}
          minLength={10}
          maxLength={1000}
          required
          disabled={loading}
        />

        <div className="input-form-footer">
          <div className="character-count">
            {text.length}/1000 characters
          </div>
          <button type="submit" className="submit-button" disabled={loading || text.length < 10}>
            {loading ? 'Generating Story...' : 'Generate Story'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  )
}
