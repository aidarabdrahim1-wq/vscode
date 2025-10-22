import { useEffect, useState } from 'react'

type Profile = {
  student_id: string
  name: string
  level: string
  interests: string[]
  learning_style: string
  weak_topics: string[]
  strong_topics: string[]
  preferred_language: string
}

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const p: Profile = {
      student_id: 'demo',
      name: 'Студент',
      level: 'орташа',
      interests: ['футбол', 'ойындар'],
      learning_style: 'визуалды + практика',
      weak_topics: ['квадрат теңдеулер'],
      strong_topics: ['геометрия'],
      preferred_language: 'kk',
    }
    setProfile(p)
  }, [])

  if (!profile) return null

  return (
    <div>
      <h3>Профиль</h3>
      <p><b>Аты:</b> {profile.name}</p>
      <p><b>Деңгей:</b> {profile.level}</p>
      <p><b>Қызығушылық:</b> {profile.interests.join(', ')}</p>
    </div>
  )
}
