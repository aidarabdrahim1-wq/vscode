import { useState } from 'react'

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const send = async () => {
    if (!input.trim()) return
    const message = input.trim()
    setMessages((m) => [...m, `Сен: ${message}`])
    setInput('')
    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setMessages((m) => [...m, `Мұғалім: ${data.reply}`])
    } catch (e) {
      setMessages((m) => [...m, 'Қате: серверге қосылмады'])
    }
  }

  return (
    <div>
      <h3>AI Чат</h3>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <div className="row">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Сұрағыңды жаз..." />
        <button onClick={send}>Жіберу</button>
      </div>
    </div>
  )
}
