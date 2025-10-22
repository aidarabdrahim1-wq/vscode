import { useState } from 'react'

export default function Progress() {
  const [accuracy, setAccuracy] = useState<number | null>(null)

  const report = async () => {
    const completed = 10
    const correct = 7
    const res = await fetch('/api/analytics/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: 'demo', completed, correct }),
    })
    const data = await res.json()
    setAccuracy(Math.round(data.accuracy))
  }

  return (
    <div>
      <h3>Прогресс</h3>
      <button onClick={report}>Прогресті жаңарту</button>
      {accuracy !== null && <div>Дәлдік: {accuracy}%</div>}
    </div>
  )
}
