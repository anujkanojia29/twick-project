import { useState } from 'react'

type FeedbackProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (feedbackData: { name: string; email: string; message: string }) => void
}

export default function Feedback({ isOpen, onClose, onSubmit }: FeedbackProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({ name: trimmedName, email: trimmedEmail, message: trimmedMessage })
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="feedback-title"
      aria-describedby="feedback-description"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          width: 'min(92vw, 520px)',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          padding: 20
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 id="feedback-title" style={{ margin: 0, fontSize: 18 }}>Share your feedback</h2>
          <button
            onClick={onClose}
            aria-label="Close feedback"
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        <p id="feedback-description" style={{ marginTop: 0, marginBottom: 12, color: '#444' }}>
          What do you think about the Twick project? Your feedback helps us improve.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #ddd',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 14,
              boxSizing: 'border-box'
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #ddd',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 14,
              boxSizing: 'border-box'
            }}
          />
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your feedback here..."
          rows={6}
          style={{
            width: '100%',
            resize: 'vertical',
            borderRadius: 8,
            border: '1px solid #ddd',
            padding: 12,
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 14,
            boxSizing: 'border-box'
          }}
        />

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 12px',
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#111827',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0}
            style={{
              padding: '8px 12px',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: (isSubmitting || name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) ? 'not-allowed' : 'pointer',
              opacity: (isSubmitting || name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) ? 0.6 : 1
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}


