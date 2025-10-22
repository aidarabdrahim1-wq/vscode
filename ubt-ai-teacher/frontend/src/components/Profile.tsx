import { useEffect, useState } from 'react';
import { getStudent, saveStudent } from '../api';
import type { StudentProfile } from '../types';

function toList(s: string): string[] {
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

function fromList(list: string[]): string {
  return list.join(', ');
}

export default function Profile() {
  const [studentId, setStudentId] = useState<string>(() => localStorage.getItem('student_id') || 'student-1');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('student_id', studentId);
    setError(null);
    setLoading(true);
    getStudent(studentId)
      .then((p) => setProfile(p))
      .catch(() =>
        setProfile({
          student_id: studentId,
          name: '',
          level: 'орташа',
          interests: [],
          learning_style: '',
          weak_topics: [],
          strong_topics: [],
          preferred_language: 'kk',
        }),
      )
      .finally(() => setLoading(false));
  }, [studentId]);

  async function onSave() {
    if (!profile) return;
    setLoading(true);
    setError(null);
    try {
      const saved = await saveStudent(profile);
      setProfile(saved);
    } catch (e: any) {
      setError(e.message || 'Сақтау қатесі');
    } finally {
      setLoading(false);
    }
  }

  if (!profile) {
    return <div>Жүктелуде...</div>;
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Студент ID</span>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span>Аты</span>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Айдын"
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Деңгей</span>
          <select
            value={profile.level}
            onChange={(e) => setProfile({ ...profile, level: e.target.value })}
          >
            <option value="бастапқы">бастапқы</option>
            <option value="орташа">орташа</option>
            <option value="жоғары">жоғары</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span>Оқу стилі</span>
          <input
            value={profile.learning_style || ''}
            onChange={(e) => setProfile({ ...profile, learning_style: e.target.value })}
            placeholder="визуалды, аудио, практика"
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Тіл</span>
          <select
            value={profile.preferred_language}
            onChange={(e) => setProfile({ ...profile, preferred_language: e.target.value })}
          >
            <option value="kk">қазақша</option>
            <option value="ru">орысша</option>
          </select>
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span>Қызығушылықтар (үтірмен)</span>
          <input
            value={fromList(profile.interests)}
            onChange={(e) => setProfile({ ...profile, interests: toList(e.target.value) })}
            placeholder="футбол, музыка, ойын"
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span>Әлсіз тақырыптар (үтірмен)</span>
          <input
            value={fromList(profile.weak_topics)}
            onChange={(e) => setProfile({ ...profile, weak_topics: toList(e.target.value) })}
            placeholder="квадрат теңдеулер, тригонометрия"
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span>Күшті тақырыптар (үтірмен)</span>
          <input
            value={fromList(profile.strong_topics)}
            onChange={(e) => setProfile({ ...profile, strong_topics: toList(e.target.value) })}
            placeholder="алгебра, геометрия"
          />
        </label>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
      )}

      <button onClick={onSave} disabled={loading}>
        {loading ? 'Сақталуда...' : 'Сақтау'}
      </button>
    </div>
  );
}
