import './App.css';
import { useState } from 'react';
import Chat from './components/Chat';
import Profile from './components/Profile';

function App() {
  const [tab, setTab] = useState<'chat' | 'profile'>('chat');
  const [studentId] = useState<string>(() => localStorage.getItem('student_id') || 'student-1');

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>UBT AI Teacher</h1>
        <nav style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setTab('chat')} disabled={tab === 'chat'}>Чат</button>
          <button onClick={() => setTab('profile')} disabled={tab === 'profile'}>Профиль</button>
        </nav>
        <div style={{ marginLeft: 'auto', color: '#6b7280' }}>ID: {studentId}</div>
      </header>
      <main style={{ flex: 1 }}>
        {tab === 'chat' ? <Chat studentId={studentId} /> : <Profile />}
      </main>
    </div>
  );
}

export default App;
