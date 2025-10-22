import { useEffect, useMemo, useRef, useState } from 'react';
import { chat as chatApi } from '../api';
import type { Message } from '../types';

interface Props {
  studentId: string;
}

export default function Chat({ studentId }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'Сәлем! ҰБТ-ға дайындалуға көмектесемін.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function onSend() {
    if (!canSend) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setInput('');
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await chatApi([...messages, userMsg], studentId);
      setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Қате болды: ${e.message || 'беймәлім қате'}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          background: '#fafafa',
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{m.role.toUpperCase()}</div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Сұрағыңызды жазыңыз..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #d1d5db', minHeight: 60 }}
        />
        <button disabled={!canSend} onClick={onSend} style={{ padding: '8px 14px', borderRadius: 8 }}>
          {loading ? 'Жіберілуде...' : 'Жіберу'}
        </button>
      </div>
    </div>
  );
}
