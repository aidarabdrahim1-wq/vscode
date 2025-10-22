import { useEffect, useState } from 'react'

type Question = {
  id: string
  prompt: string
  options: string[]
  answer_index: number
}

export default function Tests() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/tests/starter')
        const data = await res.json()
        setQuestions(data.questions)
      } catch (e) {}
    })()
  }, [])

  const submit = () => {
    let correct = 0
    for (const q of questions) {
      if (answers[q.id] === q.answer_index) correct++
    }
    const accuracy = Math.round((correct / (questions.length || 1)) * 100)
    setResult(accuracy)
  }

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id} className="question">
          <div className="prompt">{q.prompt}</div>
          <div className="options">
            {q.options.map((opt, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === idx}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={submit}>Тапсыру</button>
      {result !== null && <div>Дәлдік: {result}%</div>}
    </div>
  )
}
